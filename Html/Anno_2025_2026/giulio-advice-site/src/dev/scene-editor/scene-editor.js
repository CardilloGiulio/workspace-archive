import "./scene-editor.css";
import { SceneEditorState } from "./scene-editor-state.js";
import { buildPatch, downloadPatch, formatDegrees, formatPercent, validateLayout } from "./scene-editor-export.js";
import {
  anchorFraction,
  axisField,
  configLengthToPixels,
  dimensionValueFromPixels,
  effectiveLayout,
  normaliseRadians,
  pointerAngle,
  rotationDegrees,
  valueInPercent
} from "./scene-editor-geometry.js";
import { clearSceneOverrides, loadDevelopmentOverrides, persistScenePatch } from "./scene-editor-persistence.js";
import { createDesktopEditorUi } from "./desktop-editor-ui.js";
import { createMobileEditorUi } from "./mobile-editor-ui.js";
import {
  captureSourceLayouts,
  clearTargetMetadata,
  isSupportedScene,
  pathForTarget,
  registerSceneTargets,
  resolveRegisteredTarget,
  syncTargetLayerFlags,
  targetKey
} from "./scene-editor-targets.js";

const ACTIVATION_WINDOW_MS = 10_000;
const MOBILE_BREAKPOINT = 800;
const ALLOWED_LAYOUT_FIELDS = new Set(["left", "right", "top", "bottom", "width", "height", "rotate", "z"]);
const MIN_LAYER = 1;
const MAX_LAYER = 99;

const state = new SceneEditorState();
let targets = new Map();
let sourceLayouts = new Map();
const activePointers = new Map();
let controller = null;
let activationCount = 0;
let activationStartedAt = 0;
let optionsOpened = false;
let activeOptionsOpened = false;
let ui = null;
let live = null;
let frame = 0;
let manipulation = null;
let pausedAnimations = [];
let characterSnapshot = null;

function modeForViewport() {
  return window.innerWidth <= MOBILE_BREAKPOINT ? "mobile" : "desktop";
}

function clone(value) {
  return structuredClone(value || {});
}

function syncTargetDefinition(target, responsive) {
  const value = clone(responsive);
  if (target.type === "character") target.definition.layouts[target.layoutName] = value;
  else target.definition.layout = value;
}

function setTargetResponsive(target, responsive) {
  target.responsive = clone(responsive);
  syncTargetDefinition(target, target.responsive);
  target.instance.setLayout(target.responsive);
  syncTargetLayerFlags(target);
}

function notify(message) {
  if (!live) return;
  live.textContent = message;
  live.classList.add("is-visible");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => live?.classList.remove("is-visible"), 1700);
}

function editorActions() {
  return {
    select: selectByKey,
    save: saveChanges,
    undo,
    resetSelected,
    resetScene: resetSceneOverrides,
    backup: backupChanges,
    layer: adjustLayer,
    beginResize,
    beginRotate
  };
}

function rebuildUi() {
  ui?.remove();
  ui = state.mode === "mobile"
    ? createMobileEditorUi({ targets, actions: editorActions() })
    : createDesktopEditorUi({ targets, actions: editorActions() });
  ui.setSelectedKey(state.selected?.key);
  refreshSaveStatus();
  updateSelection();
}

function setSaveStatus(value) {
  ui?.setStatus(value);
}

function changeKey(target, mode = state.mode) {
  return `${mode}:${target.key}`;
}

function modeHasChanges(mode = state.mode) {
  return [...state.changes.keys()].some((key) => key.startsWith(`${mode}:`));
}

function refreshSaveStatus() {
  setSaveStatus(modeHasChanges() ? "Unsaved" : "Saved");
}

function pauseAnimations() {
  pausedAnimations = [...controller.stage.getAnimations({ subtree: true })]
    .map((animation) => ({ animation, playState: animation.playState }));
  pausedAnimations.forEach(({ animation }) => animation.pause());
}

function resumeAnimations() {
  for (const { animation, playState } of pausedAnimations) {
    if (playState === "running") animation.play();
  }
  pausedAnimations = [];
}

function spriteCandidates() {
  const candidates = [];
  const add = (entry) => {
    if (!entry || typeof entry !== "object") return;
    if (entry.sprite || entry.src) {
      candidates.push({ src: entry.sprite || entry.src, layout: entry.layout || "upright" });
    }
  };
  add(controller.scene.character.initial);
  for (const entry of controller.scene.mainSequence || []) add(entry);
  for (const entry of Object.values(controller.scene.animation || {})) add(entry);
  return candidates;
}

function spriteForLayout(layoutName) {
  const candidates = spriteCandidates();
  return candidates.find((candidate) => candidate.layout === layoutName) || candidates[0];
}

async function previewCharacter(target) {
  if (target.type !== "character") return;
  const sprite = spriteForLayout(target.layoutName);
  if (sprite) await controller.character.setSprite(sprite, { animate: false });
  controller.character.element.dataset.sceneEditable = "true";
}

function revealTarget(target) {
  if (target.type === "effect" || target.element.hidden) target.element.hidden = false;
}

async function selectByKey(key, { preview = false } = {}) {
  const target = targets.get(key);
  if (!target) return;
  if (preview) await previewCharacter(target);
  revealTarget(target);
  state.selected = target;
  ui?.setSelectedKey(key);
  updateSelection();
}

function currentLayer(target) {
  const current = effectiveLayout(target.responsive, state.mode);
  const explicit = Number.parseInt(current.z, 10);
  if (Number.isFinite(explicit)) return Math.min(MAX_LAYER, Math.max(MIN_LAYER, explicit));
  const rendered = Number.parseInt(getComputedStyle(target.element).zIndex, 10);
  return Number.isFinite(rendered) ? Math.min(MAX_LAYER, Math.max(MIN_LAYER, rendered)) : MIN_LAYER;
}

function updateSelection() {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    const target = state.selected;
    if (!state.active || !target || target.element.hidden) {
      ui?.updateSelection({ visible: false });
      return;
    }
    const rect = target.element.getBoundingClientRect();
    const current = effectiveLayout(target.responsive, state.mode);
    const horizontal = axisField(current, "left", "right");
    const vertical = axisField(current, "top", "bottom");
    ui?.updateSelection({
      visible: true,
      rect,
      target,
      details: {
        Object: target.type === "character" ? `Giulio: ${target.layoutName}` : target.id,
        Mode: state.mode === "mobile" ? "Mobile" : "Desktop",
        [horizontal]: current[horizontal] ?? "auto",
        [vertical]: current[vertical] ?? "auto",
        width: current.width ?? "auto",
        height: current.height ?? "auto",
        rotate: current.rotate ?? "0deg",
        layer: currentLayer(target)
      }
    });
  });
}

function layoutSnapshot(target) {
  return {
    key: target.key,
    mode: state.mode,
    hadMode: Object.hasOwn(target.responsive, state.mode),
    layout: clone(target.responsive[state.mode] || {})
  };
}

function fieldsDifferent(currentResponsive, baselineResponsive, mode) {
  const current = currentResponsive[mode] || {};
  const baseline = baselineResponsive[mode] || {};
  const changed = {};
  for (const field of ALLOWED_LAYOUT_FIELDS) {
    const currentValue = current[field];
    const baselineValue = baseline[field];
    if (currentValue !== baselineValue && currentValue !== undefined) changed[field] = currentValue;
  }
  return changed;
}

function refreshTargetChange(target, mode = state.mode) {
  const layout = fieldsDifferent(target.responsive, target.persistedResponsive, mode);
  const key = changeKey(target, mode);
  if (Object.keys(layout).length) state.setChange(key, { path: pathForTarget(target, mode), layout });
  else state.changes.delete(key);
  refreshSaveStatus();
}

function refreshAllChangesForMode(mode = state.mode) {
  for (const target of targets.values()) refreshTargetChange(target, mode);
  refreshSaveStatus();
}

function applySnapshot(snapshot) {
  const target = targets.get(snapshot.key);
  if (!target) return;
  const responsive = clone(target.responsive);
  if (snapshot.hadMode) responsive[snapshot.mode] = clone(snapshot.layout);
  else delete responsive[snapshot.mode];
  setTargetResponsive(target, responsive);
  refreshTargetChange(target, snapshot.mode || state.mode);
  state.selected = target;
  ui?.setSelectedKey(target.key);
  updateSelection();
}

function recordChange(target, before) {
  state.pushHistory(before);
  refreshTargetChange(target);
}

function applyLayout(target, nextModeLayout) {
  const responsive = clone(target.responsive);
  responsive[state.mode] = { ...(responsive[state.mode] || {}), ...nextModeLayout };
  setTargetResponsive(target, responsive);
  refreshTargetChange(target);
  updateSelection();
}

function adjustLayer(delta) {
  const target = state.selected;
  if (!state.active || !target || !Number.isFinite(delta)) return;
  const before = layoutSnapshot(target);
  const next = Math.min(MAX_LAYER, Math.max(MIN_LAYER, currentLayer(target) + Math.sign(delta)));
  applyLayout(target, { z: String(next) });
  recordChange(target, before);
  notify(delta > 0 ? "Moved one layer forward" : "Moved one layer backward");
}

function beginDrag(event, target) {
  if (event.button !== undefined && event.button !== 0) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  const compositionRect = controller.composition.getBoundingClientRect();
  const effective = effectiveLayout(target.responsive, state.mode);

  if (state.mode === "mobile" && manipulation?.target === target && activePointers.size === 2) {
    const points = [...activePointers.entries()];
    const [a, b] = points.map(([, point]) => point);
    const startWidth = configLengthToPixels(effective.width, "x", compositionRect);
    const startHeight = configLengthToPixels(effective.height, "y", compositionRect);
    if (!Number.isFinite(startWidth) || !Number.isFinite(startHeight)) {
      notify("This object has no scalable configuration size");
      return;
    }
    manipulation = {
      kind: "pinch", pointerIds: points.map(([id]) => id), target,
      before: manipulation.before,
      compositionRect, effective,
      startDistance: Math.hypot(b.x - a.x, b.y - a.y),
      startAngle: pointerAngle(a, b),
      startRotate: rotationDegrees(effective.rotate),
      startWidth,
      startHeight,
      originalWidth: effective.width,
      originalHeight: effective.height
    };
  } else {
    manipulation = {
      kind: "drag", pointerId: event.pointerId, target, before: layoutSnapshot(target),
      startX: event.clientX, startY: event.clientY, compositionRect, effective,
      hField: axisField(effective, "left", "right"), vField: axisField(effective, "top", "bottom")
    };
  }
  target.element.setPointerCapture?.(event.pointerId);
}

function beginResize(event) {
  if (!state.selected) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const target = state.selected;
  const compositionRect = controller.composition.getBoundingClientRect();
  const effective = effectiveLayout(target.responsive, state.mode);
  const startWidth = configLengthToPixels(effective.width, "x", compositionRect);
  const startHeight = configLengthToPixels(effective.height, "y", compositionRect);
  if (!Number.isFinite(startWidth) || !Number.isFinite(startHeight) || startWidth <= 0 || startHeight <= 0) {
    notify("This object has no scalable configuration size");
    return;
  }
  manipulation = {
    kind: "resize", handle: event.currentTarget.dataset.handle, pointerId: event.pointerId,
    target, before: layoutSnapshot(target), startX: event.clientX, startY: event.clientY,
    compositionRect, effective, hField: axisField(effective, "left", "right"),
    vField: axisField(effective, "top", "bottom"), startWidth, startHeight,
    originalWidth: effective.width, originalHeight: effective.height,
    aspect: startWidth / Math.max(startHeight, 1),
    anchorX: anchorFraction(effective.anchorX), anchorY: anchorFraction(effective.anchorY)
  };
  event.currentTarget.setPointerCapture?.(event.pointerId);
}

function beginRotate(event) {
  if (!state.selected || state.mode === "mobile") return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const target = state.selected;
  const rect = target.instance.visual?.getBoundingClientRect?.() || target.element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const effective = effectiveLayout(target.responsive, state.mode);
  manipulation = {
    kind: "rotate", pointerId: event.pointerId, target, before: layoutSnapshot(target),
    centerX, centerY,
    startAngle: Math.atan2(event.clientY - centerY, event.clientX - centerX),
    startRotate: rotationDegrees(effective.rotate)
  };
  event.currentTarget.setPointerCapture?.(event.pointerId);
}

function resizePositionUpdates(manipulationState, nextWidth, nextHeight) {
  const m = manipulationState;
  const output = {};
  const deltaWidth = nextWidth - m.startWidth;
  const deltaHeight = nextHeight - m.startHeight;
  const horizontalStart = valueInPercent(m.effective[m.hField], "x", m.compositionRect);
  const verticalStart = valueInPercent(m.effective[m.vField], "y", m.compositionRect);
  let horizontalDelta = 0;
  let verticalDelta = 0;

  if (m.hField === "left") {
    horizontalDelta = m.handle.includes("w")
      ? -(m.anchorX + 1) * deltaWidth
      : -m.anchorX * deltaWidth;
  } else {
    horizontalDelta = m.handle.includes("w")
      ? m.anchorX * deltaWidth
      : (m.anchorX - 1) * deltaWidth;
  }

  if (m.vField === "top") {
    verticalDelta = m.handle.includes("n")
      ? -(m.anchorY + 1) * deltaHeight
      : -m.anchorY * deltaHeight;
  } else {
    verticalDelta = m.handle.includes("n")
      ? m.anchorY * deltaHeight
      : (m.anchorY - 1) * deltaHeight;
  }

  output[m.hField] = formatPercent(horizontalStart + horizontalDelta / Math.max(m.compositionRect.width, 1) * 100);
  output[m.vField] = formatPercent(verticalStart + verticalDelta / Math.max(m.compositionRect.height, 1) * 100);
  return output;
}

function updateManipulation(event) {
  if (!manipulation) return;
  if (activePointers.has(event.pointerId)) activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (manipulation.kind !== "pinch" && event.pointerId !== manipulation.pointerId) return;
  if (manipulation.kind === "pinch" && !manipulation.pointerIds.includes(event.pointerId)) return;
  event.preventDefault();
  const m = manipulation;
  const next = {};

  if (m.kind === "pinch") {
    const points = m.pointerIds.map((id) => activePointers.get(id)).filter(Boolean);
    if (points.length < 2) return;
    const distance = Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
    const ratio = Math.max(.08, distance / Math.max(m.startDistance, 1));
    next.width = dimensionValueFromPixels(m.startWidth * ratio, m.originalWidth, "x", m.compositionRect);
    next.height = dimensionValueFromPixels(m.startHeight * ratio, m.originalHeight, "y", m.compositionRect);
    const angleDelta = normaliseRadians(pointerAngle(points[0], points[1]) - m.startAngle);
    next.rotate = formatDegrees(m.startRotate + angleDelta * 180 / Math.PI);
  } else if (m.kind === "drag") {
    const dxPct = (event.clientX - m.startX) / m.compositionRect.width * 100;
    const dyPct = (event.clientY - m.startY) / m.compositionRect.height * 100;
    const hStart = valueInPercent(m.effective[m.hField], "x", m.compositionRect);
    const vStart = valueInPercent(m.effective[m.vField], "y", m.compositionRect);
    next[m.hField] = formatPercent(hStart + (m.hField === "right" ? -dxPct : dxPct));
    next[m.vField] = formatPercent(vStart + (m.vField === "bottom" ? -dyPct : dyPct));
  } else if (m.kind === "rotate") {
    const angle = Math.atan2(event.clientY - m.centerY, event.clientX - m.centerX);
    const delta = normaliseRadians(angle - m.startAngle);
    next.rotate = formatDegrees(m.startRotate + delta * 180 / Math.PI);
  } else if (m.kind === "resize") {
    const dx = event.clientX - m.startX;
    const dy = event.clientY - m.startY;
    let width = Math.max(12, m.startWidth + (m.handle.includes("e") ? dx : -dx));
    let height = Math.max(12, m.startHeight + (m.handle.includes("s") ? dy : -dy));
    if (!event.shiftKey) {
      const widthRatio = width / m.startWidth;
      const heightRatio = height / m.startHeight;
      const ratio = Math.abs(widthRatio - 1) >= Math.abs(heightRatio - 1) ? widthRatio : heightRatio;
      width = Math.max(12, m.startWidth * ratio);
      height = Math.max(12, m.startHeight * ratio);
    }
    next.width = dimensionValueFromPixels(width, m.originalWidth, "x", m.compositionRect);
    next.height = dimensionValueFromPixels(height, m.originalHeight, "y", m.compositionRect);
    Object.assign(next, resizePositionUpdates(m, width, height));
  }
  applyLayout(m.target, next);
}

function finishManipulation(event) {
  activePointers.delete(event.pointerId);
  if (!manipulation) return;
  if (manipulation.kind === "pinch" && activePointers.size > 0) return;
  if (manipulation.kind !== "pinch" && event.pointerId !== undefined && event.pointerId !== manipulation.pointerId) return;
  const { target, before } = manipulation;
  manipulation = null;
  recordChange(target, before);
  updateSelection();
}

function finishGestureBeforeModeSwitch() {
  if (!manipulation) return;
  const { target, before } = manipulation;
  manipulation = null;
  activePointers.clear();
  recordChange(target, before);
}

function undo() {
  let index = -1;
  for (let cursor = state.history.length - 1; cursor >= 0; cursor -= 1) {
    if (state.history[cursor].mode === state.mode) {
      index = cursor;
      break;
    }
  }
  if (index < 0) return notify("Nothing to undo");
  const [snapshot] = state.history.splice(index, 1);
  applySnapshot(snapshot);
  notify("Last edit undone");
}

function resetSelected() {
  const target = state.selected;
  if (!target) return;
  const before = layoutSnapshot(target);
  const responsive = clone(target.responsive);
  if (target.sourceResponsive[state.mode]) responsive[state.mode] = clone(target.sourceResponsive[state.mode]);
  else delete responsive[state.mode];
  setTargetResponsive(target, responsive);
  recordChange(target, before);
  updateSelection();
  notify("Selected object reset");
}

function buildCurrentPatch() {
  const changes = new Map();
  for (const target of targets.values()) {
    const layout = fieldsDifferent(target.responsive, target.sourceResponsive, state.mode);
    if (Object.keys(layout).length) {
      changes.set(target.key, { path: pathForTarget(target, state.mode), layout });
    }
  }
  return buildPatch(controller.scene.id, state.mode, changes);
}

function validatePatch(patch) {
  const entries = [];
  const collect = (value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return;
    const keys = Object.keys(value);
    if (keys.some((key) => ALLOWED_LAYOUT_FIELDS.has(key))) entries.push(value);
    else Object.values(value).forEach(collect);
  };
  collect(patch.changes);
  for (const layout of entries) {
    const validation = validateLayout(layout);
    if (validation.errors.length) return validation.errors[0];
  }
  return null;
}

async function saveChanges() {
  const patch = buildCurrentPatch();
  const error = validatePatch(patch);
  if (error) {
    setSaveStatus("Save failed");
    return notify(`Save failed: ${error}`);
  }

  try {
    await persistScenePatch(patch);

    for (const target of targets.values()) {
      const persisted = clone(target.persistedResponsive);
      if (Object.hasOwn(target.responsive, state.mode)) persisted[state.mode] = clone(target.responsive[state.mode]);
      else delete persisted[state.mode];
      target.persistedResponsive = persisted;
      syncTargetDefinition(target, target.responsive);
      state.changes.delete(changeKey(target));
    }
    state.history = state.history.filter((snapshot) => snapshot.mode !== state.mode);
    setSaveStatus("Saved");
    notify("Layout saved");
  } catch (saveError) {
    setSaveStatus("Save failed");
    notify(`Save failed: ${saveError.message}`);
  }
}

function backupChanges() {
  const patch = buildCurrentPatch();
  const error = validatePatch(patch);
  if (error) return notify(`Backup blocked: ${error}`);
  downloadPatch(patch);
  notify("Backup downloaded");
}

async function resetSceneOverrides() {
  const sceneLabel = controller.scene.id.replace("advice", "Advice ");
  if (!window.confirm(`Reset all ${sceneLabel} scene overrides?`)) return;
  try {
    await clearSceneOverrides(controller.scene.id);
    for (const target of targets.values()) {
      setTargetResponsive(target, target.sourceResponsive);
      target.persistedResponsive = clone(target.sourceResponsive);
    }
    const activeLayout = controller.character.element.dataset.characterLayout
      || controller.scene.character.initial?.layout;
    const activeCharacter = targets.get(targetKey("character", "character", activeLayout));
    if (activeCharacter) activeCharacter.instance.setLayout(activeCharacter.responsive);
    state.changes.clear();
    state.history.length = 0;
    setSaveStatus("Saved");
    updateSelection();
    notify("Scene overrides reset");
  } catch (resetError) {
    setSaveStatus("Save failed");
    notify(`Reset failed: ${resetError.message}`);
  }
}

function stopSceneEvent(event) {
  if (!state.active) return;
  if (event.target.closest?.(".scene-editor-ui, .scene-editor-overlay, [data-open-settings], #settings-root")) return;
  if (event.type === "pointerdown") {
    const target = resolveRegisteredTarget(event.target, targets, controller);
    if (target) {
      selectByKey(target.key);
      beginDrag(event, target);
      return;
    }
  }
  event.preventDefault();
  event.stopImmediatePropagation();
}

function onKeydown(event) {
  if (!state.active) return;
  const typing = event.target.matches?.("input, textarea, select, [contenteditable='true']");
  if (typing) return;
  const key = event.key.toLowerCase();
  if ((event.ctrlKey || event.metaKey) && key === "z") {
    event.preventDefault();
    undo();
  } else if (key === "s" && !event.ctrlKey && !event.metaKey && state.mode === "desktop") {
    event.preventDefault();
    saveChanges();
  } else if (key === "q" && state.mode === "desktop") {
    event.preventDefault();
    adjustLayer(1);
  } else if (key === "e" && state.mode === "desktop") {
    event.preventDefault();
    adjustLayer(-1);
  } else if (event.key === "Escape" && manipulation) {
    event.preventDefault();
    applySnapshot(manipulation.before);
    manipulation = null;
    activePointers.clear();
  }
}

function handleViewportChange() {
  if (!state.active) return;
  const nextMode = modeForViewport();
  if (nextMode === state.mode) {
    updateSelection();
    return;
  }
  finishGestureBeforeModeSwitch();
  state.mode = nextMode;
  for (const target of targets.values()) target.element.dataset.sceneLayout = nextMode;
  rebuildUi();
  refreshAllChangesForMode(nextMode);
  notify(`Editing ${nextMode === "mobile" ? "mobile" : "desktop"} layout`);
}

function attachActiveListeners() {
  const blocked = ["click", "pointerdown", "pointerover", "pointerenter", "pointerleave", "dblclick", "contextmenu"];
  blocked.forEach((type) => controller.stage.addEventListener(type, stopSceneEvent, true));
  window.addEventListener("pointermove", updateManipulation, { passive: false });
  window.addEventListener("pointerup", finishManipulation, true);
  window.addEventListener("pointercancel", finishManipulation, true);
  window.addEventListener("keydown", onKeydown, true);
  window.addEventListener("resize", handleViewportChange);
  state.listeners = { blocked };
}

function detachActiveListeners() {
  state.listeners?.blocked.forEach((type) => controller.stage.removeEventListener(type, stopSceneEvent, true));
  window.removeEventListener("pointermove", updateManipulation);
  window.removeEventListener("pointerup", finishManipulation, true);
  window.removeEventListener("pointercancel", finishManipulation, true);
  window.removeEventListener("keydown", onKeydown, true);
  window.removeEventListener("resize", handleViewportChange);
}

function showInactiveEditorMessage(message) {
  const notice = document.createElement("div");
  notice.className = "scene-editor-live scene-editor-live--activation is-visible";
  notice.setAttribute("aria-live", "polite");
  notice.textContent = message;
  document.body.append(notice);
  setTimeout(() => notice.remove(), 2200);
}

async function activate() {
  if (state.active || !controller || !isSupportedScene(controller.scene.id)) return;
  if (controller.isSceneBusy?.() ?? (controller.busy || controller.dialogue?.active)) {
    showInactiveEditorMessage("Finish the current scene action before editing.");
    return;
  }

  state.reset();
  state.active = true;
  state.mode = modeForViewport();
  characterSnapshot = {
    layout: controller.character.element.dataset.characterLayout,
    src: controller.character.image.dataset.currentSrc,
    hidden: controller.character.element.hidden
  };
  targets = registerSceneTargets(controller, state.mode, sourceLayouts);
  for (const target of targets.values()) state.remember(target.key, target.persistedResponsive);

  document.documentElement.classList.add("scene-editor-active");
  window.__sceneEditorActive = true;
  pauseAnimations();

  live = document.createElement("div");
  live.className = "scene-editor-live";
  live.setAttribute("aria-live", "polite");
  document.body.append(live);

  rebuildUi();
  attachActiveListeners();
  const activeLayout = controller.character.element.dataset.characterLayout
    || controller.scene.character.initial?.layout;
  const initialKey = targetKey("character", "character", activeLayout);
  await selectByKey(targets.has(initialKey) ? initialKey : targets.keys().next().value, { preview: false });
  setSaveStatus("Saved");
  notify("Scene editor active");
}

async function deactivate() {
  if (!state.active) return;
  detachActiveListeners();
  manipulation = null;
  activePointers.clear();

  for (const target of targets.values()) {
    setTargetResponsive(target, target.persistedResponsive);
    target.element.hidden = target.hidden;
  }
  clearTargetMetadata(targets);

  if (characterSnapshot) {
    const sprite = characterSnapshot.src
      ? { src: characterSnapshot.src, layout: characterSnapshot.layout }
      : spriteForLayout(characterSnapshot.layout);
    if (sprite) await controller.character.setSprite(sprite, { animate: false });
    controller.character.element.hidden = characterSnapshot.hidden;
  }

  resumeAnimations();
  ui?.remove();
  live?.remove();
  ui = null;
  live = null;
  document.documentElement.classList.remove("scene-editor-active");
  window.__sceneEditorActive = false;
  targets.clear();
  state.reset();
}

function resetActivation() {
  activationCount = 0;
  activationStartedAt = 0;
  optionsOpened = false;
}

function onOptionsOpen() {
  if (state.active) activeOptionsOpened = true;
  else optionsOpened = true;
}

function onOptionsClose() {
  if (state.active) {
    if (activeOptionsOpened) {
      activeOptionsOpened = false;
      deactivate();
    }
    return;
  }
  if (!optionsOpened) return resetActivation();
  optionsOpened = false;
  const now = Date.now();
  if (!activationStartedAt || now - activationStartedAt > ACTIVATION_WINDOW_MS) {
    activationStartedAt = now;
    activationCount = 1;
  } else activationCount += 1;
  if (activationCount >= 3) {
    resetActivation();
    activate();
  }
}

async function initialise() {
  controller = window.__GIULIO_SCENE_CONTROLLER__;
  if (!controller || document.body.dataset.page !== "advice" || !isSupportedScene(controller.scene.id)) return;
  document.documentElement.classList.add("scene-editor-development");
  sourceLayouts = captureSourceLayouts(controller);
  try {
    await loadDevelopmentOverrides(controller);
  } catch (error) {
    console.warn("Scene editor overrides could not be loaded.", error);
  }
  document.addEventListener("giulio:settings-open", onOptionsOpen);
  document.addEventListener("giulio:settings-close", onOptionsClose);
  window.addEventListener("pagehide", resetActivation);
}

void initialise();
