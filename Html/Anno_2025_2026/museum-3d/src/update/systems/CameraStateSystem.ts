import { Vector3 } from "@babylonjs/core";

import type { Updatable } from "../Updatable";
import type { UpdateContext } from "../UpdateContext";

type StoredCameraState = {
  position: [number, number, number];
  rotation: [number, number, number];
};

const STORAGE_KEY = "museum.cameraState.v1";
const SAVE_INTERVAL_SECONDS = 0.5;

export class CameraStateSystem implements Updatable {
  readonly name = "CameraStateSystem";

  private saveTimer = 0;

  start(context: UpdateContext): void {
    this.restoreCamera(context);
    this.installResetShortcut();
  }

  update(context: UpdateContext): void {
    this.saveTimer += context.deltaTime;

    if (this.saveTimer < SAVE_INTERVAL_SECONDS) {
      return;
    }

    this.saveTimer = 0;
    this.saveCamera(context);
  }

  private restoreCamera(context: UpdateContext): void {
    const rawState = localStorage.getItem(STORAGE_KEY);

    if (!rawState) {
      return;
    }

    try {
      const state = JSON.parse(rawState) as StoredCameraState;

      context.camera.position = new Vector3(
        state.position[0],
        state.position[1],
        state.position[2]
      );

      context.camera.rotation = new Vector3(
        state.rotation[0],
        state.rotation[1],
        state.rotation[2]
      );

      console.info("📷 Camera position restored");
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      console.warn("📷 Invalid saved camera position removed");
    }
  }

  private saveCamera(context: UpdateContext): void {
    const state: StoredCameraState = {
      position: [
        round(context.camera.position.x),
        round(context.camera.position.y),
        round(context.camera.position.z),
      ],
      rotation: [
        round(context.camera.rotation.x),
        round(context.camera.rotation.y),
        round(context.camera.rotation.z),
      ],
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  private installResetShortcut(): void {
    window.addEventListener("keydown", (event) => {
      if (event.shiftKey && event.key.toLowerCase() === "r") {
        localStorage.removeItem(STORAGE_KEY);
        console.info("📷 Saved camera position cleared. Reload the page.");
      }
    });
  }
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}
