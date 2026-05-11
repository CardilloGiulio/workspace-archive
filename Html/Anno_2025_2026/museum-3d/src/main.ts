import "./style.css";

import { BabylonAppBuilder } from "./setup/BabylonAppBuilder";
import { loadObjectsFromJsonFolder } from "./loaders/sceneObjectLoader";
import { buildSceneObjects } from "./builders/sceneObjectBuilder";
import { applyRenderSettings } from "./render/renderSettings";

import { UpdateManager } from "./update/UpdateManager";
import { CameraStateSystem } from "./update/systems/CameraStateSystem";
import { CameraCollisionSystem } from "./update/systems/CameraCollisionSystem";

import {
  debugFail,
  debugOk,
  debugStep,
  debugWarn,
} from "./debug/debugLogger";

async function main(): Promise<void> {
  try {
    debugStep("main", "Starting app");

    const app = BabylonAppBuilder.build("renderCanvas");

    const objects = loadObjectsFromJsonFolder();

    if (objects.length === 0) {
      debugWarn("main", "No objects loaded");
    } else {
      debugOk("main", `Objects loaded: ${objects.length}`);
    }

    const meshes = await buildSceneObjects(app.scene, objects);

    debugOk("main", `Meshes built: ${meshes.length}`);

    const updateManager = new UpdateManager(app);

    updateManager.add(new CameraStateSystem());
    updateManager.add(new CameraCollisionSystem());

    applyRenderSettings(app.engine, app.scene, updateManager);

    debugOk("main", "App running");
  } catch (error) {
    debugFail("main", "Startup failed", error);
  }
}

main();
