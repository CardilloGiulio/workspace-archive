import { Scene } from "@babylonjs/core";
import type { Engine } from "@babylonjs/core";

export class SceneLoader {
  static load(engine: Engine): Scene {
    const scene = new Scene(engine);

    scene.collisionsEnabled = true;

    return scene;
  }
}
