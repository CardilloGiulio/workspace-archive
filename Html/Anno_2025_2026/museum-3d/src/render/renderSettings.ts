import type { Engine, Scene } from "@babylonjs/core";
import type { UpdateManager } from "../update/UpdateManager";

import { debugOk, debugStep } from "../debug/debugLogger";

export function applyRenderSettings(
  engine: Engine,
  scene: Scene,
  updateManager: UpdateManager
): void {
  debugStep("render", "Applying render settings");

  updateManager.start();
  startRenderLoop(engine, scene, updateManager);
  setupResizeHandler(engine);

  debugOk("render", "Render settings applied");
}

function startRenderLoop(
  engine: Engine,
  scene: Scene,
  updateManager: UpdateManager
): void {
  engine.runRenderLoop(() => {
    updateManager.update();
    scene.render();
  });

  debugOk("render", "Render loop started");
}

function setupResizeHandler(engine: Engine): void {
  window.addEventListener("resize", () => {
    engine.resize();
  });

  debugOk("render", "Resize handler installed");
}
