function addTargetOptions(select, targets) {
  for (const target of targets.values()) {
    const option = document.createElement("option");
    option.value = target.key;
    option.textContent = target.type === "character"
      ? `Giulio: ${target.layoutName}`
      : `${target.type}: ${target.id}`;
    select.append(option);
  }
}

export function createDesktopEditorUi({ targets, actions }) {
  const overlay = document.createElement("div");
  overlay.className = "scene-editor-overlay scene-editor-overlay--desktop";
  overlay.innerHTML = `
    <div class="scene-editor-selection scene-editor-selection--desktop" hidden>
      <span class="scene-editor-label"></span>
      <button class="scene-editor-rotation-handle" data-rotate-handle type="button" aria-label="Rotate selected object"></button>
      <button class="scene-editor-handle" data-handle="nw" type="button" aria-label="Resize from top left"></button>
      <button class="scene-editor-handle" data-handle="ne" type="button" aria-label="Resize from top right"></button>
      <button class="scene-editor-handle" data-handle="sw" type="button" aria-label="Resize from bottom left"></button>
      <button class="scene-editor-handle" data-handle="se" type="button" aria-label="Resize from bottom right"></button>
    </div>`;

  const inspector = document.createElement("aside");
  inspector.className = "scene-editor-desktop-inspector scene-editor-ui";
  inspector.innerHTML = `
    <div class="scene-editor-inspector-head">
      <strong>Scene Editor · Desktop</strong>
      <span class="scene-editor-save-status" data-editor-save-status>Saved</span>
    </div>
    <label class="scene-editor-field">Target
      <select data-editor-target aria-label="Select scene object"></select>
    </label>
    <dl class="scene-editor-inspector-values" data-editor-values></dl>
    <div class="scene-editor-desktop-actions">
      <button type="button" data-editor-save>Save</button>
      <button type="button" data-editor-undo>Undo</button>
      <button type="button" data-editor-reset>Reset selected</button>
      <button type="button" data-editor-backup>Backup</button>
      <button type="button" data-editor-reset-scene>Reset scene</button>
    </div>
    <p class="scene-editor-shortcuts">S save · Ctrl+Z undo · Q front · E back · Esc cancel</p>`;

  document.body.append(overlay, inspector);
  const selection = overlay.querySelector(".scene-editor-selection");
  const label = overlay.querySelector(".scene-editor-label");
  const status = inspector.querySelector("[data-editor-save-status]");
  const select = inspector.querySelector("[data-editor-target]");
  const values = inspector.querySelector("[data-editor-values]");
  addTargetOptions(select, targets);

  select.addEventListener("change", () => actions.select(select.value, { preview: true }));
  inspector.querySelector("[data-editor-save]").addEventListener("click", actions.save);
  inspector.querySelector("[data-editor-undo]").addEventListener("click", actions.undo);
  inspector.querySelector("[data-editor-reset]").addEventListener("click", actions.resetSelected);
  inspector.querySelector("[data-editor-backup]").addEventListener("click", actions.backup);
  inspector.querySelector("[data-editor-reset-scene]").addEventListener("click", actions.resetScene);
  overlay.querySelectorAll("[data-handle]").forEach((handle) => handle.addEventListener("pointerdown", actions.beginResize));
  overlay.querySelector("[data-rotate-handle]").addEventListener("pointerdown", actions.beginRotate);

  return {
    mode: "desktop",
    setStatus(value) {
      status.textContent = value;
      status.dataset.status = value.toLowerCase().replace(/\s+/g, "-");
    },
    setSelectedKey(key) {
      if (key && [...select.options].some((option) => option.value === key)) select.value = key;
    },
    updateSelection({ visible, rect, target, details }) {
      selection.hidden = !visible;
      if (!visible) return;
      Object.assign(selection.style, {
        left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px`
      });
      label.textContent = target.key;
      values.innerHTML = Object.entries(details)
        .map(([name, value]) => `<div><dt>${name}</dt><dd>${String(value)}</dd></div>`)
        .join("");
    },
    remove() {
      overlay.remove();
      inspector.remove();
    }
  };
}
