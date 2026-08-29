import { setLayerOverrideFlag } from "./scene-editor-targets.js";

const SAVE_ENDPOINT = "/__scene-editor/save";
const RESET_ENDPOINT = "/__scene-editor/reset";
const ALLOWED_LAYOUT_FIELDS = new Set(["left", "right", "top", "bottom", "width", "height", "rotate", "z"]);

function clone(value) {
  return structuredClone(value || {});
}

function allowedLayout(layout) {
  if (!layout || typeof layout !== "object" || Array.isArray(layout)) return {};
  return Object.fromEntries(Object.entries(layout).filter(
    ([field, value]) => ALLOWED_LAYOUT_FIELDS.has(field) && typeof value === "string"
  ));
}

function mergeOverrideIntoResponsive(responsive, mode, layout) {
  const next = clone(responsive);
  next[mode] = { ...(next[mode] || {}), ...allowedLayout(layout) };
  return next;
}

function applyOverrideChanges(controller, changes, mode) {
  if (!changes || typeof changes !== "object") return;

  for (const [id, node] of Object.entries(changes.props || {})) {
    const instance = controller.objects.get(id);
    const layout = node?.layout?.[mode];
    if (!instance || !layout) continue;
    instance.definition.layout = mergeOverrideIntoResponsive(instance.definition.layout, mode, layout);
    instance.setLayout(instance.definition.layout);
  }

  const triggerLayout = changes.trigger?.layout?.[mode];
  if (controller.trigger && triggerLayout) {
    controller.scene.trigger.layout = mergeOverrideIntoResponsive(controller.scene.trigger.layout, mode, triggerLayout);
    controller.trigger.definition.layout = controller.scene.trigger.layout;
    controller.trigger.setLayout(controller.scene.trigger.layout);
    setLayerOverrideFlag(controller.trigger.element, mode, Object.hasOwn(triggerLayout, "z"));
  }

  for (const [id, node] of Object.entries(changes.effects || {})) {
    const instance = controller.effects.get(id);
    const layout = node?.layout?.[mode];
    if (!instance || !layout) continue;
    instance.definition.layout = mergeOverrideIntoResponsive(instance.definition.layout, mode, layout);
    instance.setLayout(instance.definition.layout);
  }

  for (const [layoutName, node] of Object.entries(changes.character?.layouts || {})) {
    const layout = node?.[mode];
    if (!layout || !controller.scene.character.layouts[layoutName]) continue;
    controller.scene.character.layouts[layoutName] = mergeOverrideIntoResponsive(
      controller.scene.character.layouts[layoutName], mode, layout
    );
  }
}

export async function loadDevelopmentOverrides(controller) {
  const response = await fetch(SAVE_ENDPOINT, { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const overrides = await response.json();
  const sceneOverrides = overrides?.[controller.scene.id] || {};
  applyOverrideChanges(controller, sceneOverrides.desktop, "desktop");
  applyOverrideChanges(controller, sceneOverrides.mobile, "mobile");

  const activeLayout = controller.character.element.dataset.characterLayout
    || controller.scene.character.initial.layout;
  const responsive = controller.scene.character.layouts[activeLayout];
  if (responsive) controller.character.setLayout(responsive);
  return sceneOverrides;
}

export async function persistScenePatch(patch) {
  const response = await fetch(SAVE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch)
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) throw new Error(result.error || `HTTP ${response.status}`);
  return result;
}

export async function clearSceneOverrides(sceneId) {
  const response = await fetch(RESET_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sceneId })
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) throw new Error(result.error || `HTTP ${response.status}`);
  return result;
}
