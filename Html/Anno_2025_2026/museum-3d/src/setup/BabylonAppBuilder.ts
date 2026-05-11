import type { BabylonApp } from "./BabylonApp";

import { CanvasLoader } from "./CanvasLoader";
import { EngineLoader } from "./EngineLoader";
import { SceneLoader } from "./SceneLoader";
import { CameraLoader } from "./CameraLoader";
import { LightLoader } from "./LightLoader";

export class BabylonAppBuilder {
  static build(canvasId: string): BabylonApp {
    const canvas = CanvasLoader.load(canvasId);
    const engine = EngineLoader.load(canvas);
    const scene = SceneLoader.load(engine);
    const camera = CameraLoader.load(scene, canvas);
    const light = LightLoader.load(scene);

    return {
      canvas,
      engine,
      scene,
      camera,
      light,
    };
  }
}
