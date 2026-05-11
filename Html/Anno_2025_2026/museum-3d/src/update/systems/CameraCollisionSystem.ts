import { Mesh } from "@babylonjs/core";

import type { Updatable } from "../Updatable";
import type { UpdateContext } from "../UpdateContext";

import { debugOk, debugWarn } from "../../debug/debugLogger";

export class CameraCollisionSystem implements Updatable {
  readonly name = "CameraCollisionSystem";

  start(context: UpdateContext): void {
    context.scene.collisionsEnabled = true;

    const collisionMeshes = this.getCollisionMeshes(context);

    if (collisionMeshes.length === 0) {
      debugWarn(
        "collision",
        "No collidable meshes found. Check JSON collision values and builder collision assignment."
      );
    } else {
      debugOk("collision", `Collidable meshes found: ${collisionMeshes.length}`);
    }
  }

  update(context: UpdateContext): void {
    // Keep Babylon's collision system enabled globally, but do not restore
    // the camera position here. Player mode owns player/camera movement.
    context.scene.collisionsEnabled = true;
  }

  private getCollisionMeshes(context: UpdateContext): Mesh[] {
    return context.scene.meshes.filter((mesh): mesh is Mesh => {
      return mesh instanceof Mesh && mesh.checkCollisions === true;
    });
  }
}
