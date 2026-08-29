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

export function createMobileEditorUi({ targets, actions }) {
  const overlay = document.createElement("div");
  overlay.className = "scene-editor-overlay scene-editor-overlay--mobile";
  overlay.innerHTML = `
    <div class="scene-editor-selection scene-editor-selection--mobile" hidden>
      <span class="scene-editor-mobile-label"></span>
    </div>`;

  const bar = document.createElement("div");
  bar.className = "scene-editor-mobile-bar scene-editor-ui";
  bar.innerHTML = `
    <div class="scene-editor-mobile-row scene-editor-mobile-row--status">
      <strong>Mobile</strong>
      <span class="scene-editor-save-status" data-editor-save-status>Saved</span>
      <select data-editor-target aria-label="Select scene object"></select>
    </div>
    <div class="scene-editor-mobile-row scene-editor-mobile-row--actions">
      <button type="button" data-editor-save aria-label="Save scene layout"><b>G</b><span>Save</span></button>
      <button type="button" data-editor-undo aria-label="Undo last edit"><b>↶</b><span>Undo</span></button>
      <button type="button" data-editor-reset aria-label="Reset selected object"><b>↺</b><span>Reset</span></button>
      <button type="button" data-editor-front aria-label="Move selected object one layer forward"><b>↑</b><span>Front</span></button>
      <button type="button" data-editor-back aria-label="Move selected object one layer backward"><b>↓</b><span>Back</span></button>
      <button type="button" data-editor-backup aria-label="Download backup patch"><b>⇩</b><span>Backup</span></button>
      <button type="button" data-editor-reset-scene aria-label="Reset current scene overrides"><b>×</b><span>Scene</span></button>
    </div>`;

  document.body.append(overlay, bar);
  const selection = overlay.querySelector(".scene-editor-selection");
  const label = overlay.querySelector(".scene-editor-mobile-label");
  const status = bar.querySelector("[data-editor-save-status]");
  const select = bar.querySelector("[data-editor-target]");
  addTargetOptions(select, targets);

  select.addEventListener("change", () => actions.select(select.value, { preview: true }));
  bar.querySelector("[data-editor-save]").addEventListener("click", actions.save);
  bar.querySelector("[data-editor-undo]").addEventListener("click", actions.undo);
  bar.querySelector("[data-editor-reset]").addEventListener("click", actions.resetSelected);
  bar.querySelector("[data-editor-front]").addEventListener("click", () => actions.layer(1));
  bar.querySelector("[data-editor-back]").addEventListener("click", () => actions.layer(-1));
  bar.querySelector("[data-editor-backup]").addEventListener("click", actions.backup);
  bar.querySelector("[data-editor-reset-scene]").addEventListener("click", actions.resetScene);

  return {
    mode: "mobile",
    setStatus(value) {
      status.textContent = value;
      status.dataset.status = value.toLowerCase().replace(/\s+/g, "-");
    },
    setSelectedKey(key) {
      if (key && [...select.options].some((option) => option.value === key)) select.value = key;
    },
    updateSelection({ visible, rect, target }) {
      selection.hidden = !visible;
      if (!visible) return;
      Object.assign(selection.style, {
        left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px`
      });
      label.textContent = target.key;
    },
    remove() {
      overlay.remove();
      bar.remove();
    }
  };
}
