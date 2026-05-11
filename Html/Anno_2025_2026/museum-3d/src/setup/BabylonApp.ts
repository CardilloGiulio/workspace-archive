import type {
  Engine,
  HemisphericLight,
  Scene,
  UniversalCamera,
} from "@babylonjs/core";

export type BabylonApp = {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene;
  camera: UniversalCamera;
  light: HemisphericLight;
};
