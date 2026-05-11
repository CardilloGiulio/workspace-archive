import {
  Mesh,
  Vector3,
} from "@babylonjs/core";

import type { Updatable } from "../Updatable";
import type { UpdateContext } from "../UpdateContext";

import {
  debugOk,
  debugWarn,
} from "../../debug/debugLogger";

export class CameraCollisionSystem implements Updatable {
  readonly name = "CameraCollisionSystem";

  private lastSafePosition = new Vector3(0, 1.7, 3);
  private warningAlreadyShown = false;

  start(context: UpdateContext): void {
    context.scene.collisionsEnabled = true;

    context.camera.checkCollisions = true;
    context.camera.applyGravity = false;
    context.camera.ellipsoid = new Vector3(0.35, 0.85, 0.35);

    this.lastSafePosition.copyFrom(context.camera.position);

    const collisionMeshes = this.getCollisionMeshes(context);

    if (collisionMeshes.length === 0) {
      debugWarn(
        "collision",
        "No collidable meshes found. Check that JSON objects have collision: true"
      );
    } else {
      debugOk("collision", `Collidable meshes found: ${collisionMeshes.length}`);
    }
  }

  update(context: UpdateContext): void {
    context.scene.collisionsEnabled = true;
    context.camera.checkCollisions = true;

    const cameraIsInsideCollision = this.isCameraInsideAnyCollisionMesh(context);

    if (cameraIsInsideCollision) {
      context.camera.position.copyFrom(this.lastSafePosition);

      if (!this.warningAlreadyShown) {
        debugWarn(
          "collision",
          "Camera entered a collidable object. Restored last safe position."
        );

        this.warningAlreadyShown = true;
      }

      return;
    }

    this.lastSafePosition.copyFrom(context.camera.position);
    this.warningAlreadyShown = false;
  }

  private isCameraInsideAnyCollisionMesh(context: UpdateContext): boolean {
    const cameraPosition = context.camera.position;
    const collisionMeshes = this.getCollisionMeshes(context);

    return collisionMeshes.some((mesh) => {
      mesh.computeWorldMatrix(true);

      const boundingBox = mesh.getBoundingInfo().boundingBox;
      const minimum = boundingBox.minimumWorld;
      const maximum = boundingBox.maximumWorld;

      return (
        cameraPosition.x >= minimum.x &&
        cameraPosition.x <= maximum.x &&
        cameraPosition.y >= minimum.y &&
        cameraPosition.y <= maximum.y &&
        cameraPosition.z >= minimum.z &&
        cameraPosition.z <= maximum.z
      );
    });
  }

  private getCollisionMeshes(context: UpdateContext): Mesh[] {
    return context.scene.meshes.filter((mesh): mesh is Mesh => {
      return mesh instanceof Mesh && mesh.checkCollisions === true;
    });
  }
}
