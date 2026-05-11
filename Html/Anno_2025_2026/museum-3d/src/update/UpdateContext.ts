import type {
  Engine,
  Scene,
  UniversalCamera,
} from "@babylonjs/core";

export type UpdateContext = {
  engine: Engine;
  scene: Scene;
  camera: UniversalCamera;
  deltaTime: number;
};
