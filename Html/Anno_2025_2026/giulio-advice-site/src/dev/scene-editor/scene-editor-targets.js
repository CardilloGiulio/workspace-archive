function isAdviceScene(sceneId) {
  return /^advice\d+$/.test(sceneId || "");
}

function clone(value) {
  return structuredClone(value || {});
}

export function targetKey(type, id, layoutName = "") {
  return type === "character" ? `character:${layoutName}` : `${type}:${id}`;
}

export function pathForTarget(target, mode) {
  if (target.type === "character") return ["character", "layouts", target.layoutName, mode];
  if (target.type === "trigger") return ["trigger", "layout", mode];
  return [`${target.type}s`, target.id, "layout", mode];
}

export function captureSourceLayouts(controller) {
  const layouts = new Map();
  if (!controller || !isAdviceScene(controller.scene?.id)) return layouts;

  for (const definition of controller.scene.props || []) {
    layouts.set(targetKey("prop", definition.id), clone(definition.layout));
  }
  if (controller.scene.trigger) {
    layouts.set(targetKey("trigger", controller.scene.trigger.id), clone(controller.scene.trigger.layout));
  }
  for (const definition of controller.scene.effects || []) {
    layouts.set(targetKey("effect", definition.id), clone(definition.layout));
  }
  for (const [layoutName, responsive] of Object.entries(controller.scene.character?.layouts || {})) {
    layouts.set(targetKey("character", "character", layoutName), clone(responsive));
  }
  return layouts;
}

function createTarget({ type, id, instance, element, definition, sourceLayouts, layoutName = null }) {
  const key = targetKey(type, id, layoutName);
  const responsive = type === "character" ? definition.layouts?.[layoutName] : definition.layout;
  if (!responsive || !instance || !element) return null;
  const desktop = responsive.desktop || {};
  const mobile = { ...desktop, ...(responsive.mobile || {}) };
  const unavailable = desktop.display === "none" && mobile.display === "none"
    && !desktop.width && !desktop.height && !mobile.width && !mobile.height;
  if (unavailable) return null;
  return {
    key,
    type,
    id,
    instance,
    element,
    definition,
    layoutName,
    responsive: clone(responsive),
    persistedResponsive: clone(responsive),
    sourceResponsive: clone(sourceLayouts.get(key) || responsive),
    hidden: element.hidden
  };
}


export function setLayerOverrideFlag(element, mode, enabled) {
  const key = mode === "mobile" ? "sceneEditorZMobile" : "sceneEditorZDesktop";
  if (enabled) element.dataset[key] = "true";
  else delete element.dataset[key];
}

export function syncTargetLayerFlags(target) {
  if (target.type !== "trigger") return;
  for (const mode of ["desktop", "mobile"]) {
    const current = target.responsive?.[mode]?.z;
    const source = target.sourceResponsive?.[mode]?.z;
    setLayerOverrideFlag(target.element, mode, current !== undefined && current !== source);
  }
}

export function registerSceneTargets(controller, mode, sourceLayouts) {
  const targets = new Map();
  if (!controller || !isAdviceScene(controller.scene?.id)) return targets;

  for (const [id, instance] of controller.objects || []) {
    const target = createTarget({
      type: "prop", id, instance, element: instance.element,
      definition: instance.definition, sourceLayouts
    });
    if (target) targets.set(target.key, target);
  }

  if (controller.trigger && controller.scene.trigger) {
    const target = createTarget({
      type: "trigger", id: controller.scene.trigger.id,
      instance: controller.trigger, element: controller.trigger.element,
      definition: controller.scene.trigger, sourceLayouts
    });
    if (target) targets.set(target.key, target);
  }

  for (const [id, instance] of controller.effects || []) {
    const target = createTarget({
      type: "effect", id, instance, element: instance.element,
      definition: instance.definition, sourceLayouts
    });
    if (target) targets.set(target.key, target);
  }

  for (const layoutName of Object.keys(controller.scene.character?.layouts || {})) {
    const target = createTarget({
      type: "character", id: "character", layoutName,
      instance: controller.character, element: controller.character.element,
      definition: controller.scene.character, sourceLayouts
    });
    if (target) targets.set(target.key, target);
  }

  for (const target of targets.values()) {
    target.element.dataset.sceneEditable = "true";
    target.element.dataset.sceneObjectId = target.id;
    target.element.dataset.sceneObjectType = target.type;
    target.element.dataset.sceneLayout = mode;
    if (target.type !== "character") target.element.dataset.sceneEditorTargetKey = target.key;
    syncTargetLayerFlags(target);
  }
  return targets;
}

export function resolveRegisteredTarget(eventTarget, targets, controller) {
  const editable = eventTarget?.closest?.("[data-scene-editable='true']");
  if (!editable) return null;
  if (editable.dataset.sceneObjectType === "character") {
    const activeLayout = controller.character.element.dataset.characterLayout
      || controller.scene.character.initial?.layout
      || Object.keys(controller.scene.character.layouts || {})[0];
    return targets.get(targetKey("character", "character", activeLayout)) || null;
  }
  return targets.get(editable.dataset.sceneEditorTargetKey) || null;
}

export function clearTargetMetadata(targets) {
  const elements = new Set([...targets.values()].map((target) => target.element));
  for (const element of elements) {
    delete element.dataset.sceneEditable;
    delete element.dataset.sceneObjectId;
    delete element.dataset.sceneObjectType;
    delete element.dataset.sceneLayout;
    delete element.dataset.sceneEditorTargetKey;
  }
}

export function isSupportedScene(sceneId) {
  return isAdviceScene(sceneId);
}
