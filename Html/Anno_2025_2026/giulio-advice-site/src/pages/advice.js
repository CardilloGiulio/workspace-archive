import { getScene } from "../config/scenes/index.js";
import { SceneController } from "../ui/scene/scene-controller.js";
import { logger } from "../services/logger.js";
import { initSettingsPanel } from "../ui/settings-panel.js";

function ensureAdviceOptions() {
  if (!document.querySelector("[data-open-settings]")) {
    document.body.insertAdjacentHTML("beforeend", `
      <button
        class="scene-options-button"
        type="button"
        data-open-settings
        aria-label="Apri impostazioni"
      >
        ⚙
      </button>
    `);
  }
  if (!document.getElementById("settings-root")) {
    document.body.insertAdjacentHTML("beforeend", '<div id="settings-root"></div>');
  }
}

export async function initAdvicePage() {
  ensureAdviceOptions();
  initSettingsPanel();
  const sceneId = document.body.dataset.scene;
  const scene = getScene(sceneId);
  const root = document.getElementById("scene-root");

  if (!scene || !root) {
    logger.log("scene_configuration_missing", { sceneId });
    if (root) root.innerHTML = '<p class="fatal-fallback">Scena non disponibile.</p>';
    return;
  }

  document.title = `Giulio — ${scene.location}`;
  const controller = new SceneController(root, scene);
  await controller.init();
  if (import.meta.env.DEV) window.__GIULIO_SCENE_CONTROLLER__ = controller;
}
