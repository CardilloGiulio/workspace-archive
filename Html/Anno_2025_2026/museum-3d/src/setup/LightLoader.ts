import {
  HemisphericLight,
  Vector3,
} from "@babylonjs/core";

import type { Scene } from "@babylonjs/core";

export class LightLoader {
  static load(scene: Scene): HemisphericLight {
    const light = new HemisphericLight(
      "mainLight",
      new Vector3(0, 1, 0),
      scene
    );

    light.intensity = 0.85;

    return light;
  }
}
