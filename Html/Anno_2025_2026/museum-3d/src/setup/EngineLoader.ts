import { Engine } from "@babylonjs/core";

export class EngineLoader {
  static load(canvas: HTMLCanvasElement): Engine {
    return new Engine(canvas, true);
  }
}
