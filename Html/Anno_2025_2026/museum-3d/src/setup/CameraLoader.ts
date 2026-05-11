import {
  UniversalCamera,
  Vector3,
} from "@babylonjs/core";

import type { Scene } from "@babylonjs/core";

export class CameraLoader {
  static load(scene: Scene, canvas: HTMLCanvasElement): UniversalCamera {
    const camera = new UniversalCamera(
      "museumCamera",
      new Vector3(0, 1.7, 3),
      scene
    );

    camera.setTarget(new Vector3(0, 1.7, 0));

    camera.attachControl(canvas, true);

    camera.speed = 0.12;
    camera.angularSensibility = 3500;

    camera.minZ = 0.05;
    camera.maxZ = 1000;

    // Keep these disabled until the camera position is confirmed.
    camera.checkCollisions = false;
    camera.applyGravity = false;

    camera.ellipsoid = new Vector3(0.35, 0.85, 0.35);

    camera.keysUp.push(87);    // W
    camera.keysDown.push(83);  // S
    camera.keysLeft.push(65);  // A
    camera.keysRight.push(68); // D

    return camera;
  }
}