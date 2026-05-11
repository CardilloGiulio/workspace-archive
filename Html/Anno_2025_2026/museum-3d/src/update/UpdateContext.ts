import type {
  Engine,
  Scene,
  UniversalCamera,
} from "@babylonjs/core";

export type UpdateContext = {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene;
  camera: UniversalCamera;
  deltaTime: number;
};
