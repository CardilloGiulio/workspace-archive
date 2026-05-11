import { Vector3 } from "@babylonjs/core";

import type { AppRole } from "../AppRole";
import { RoleKind } from "../RoleKind";
import type { UpdateContext } from "../../update/UpdateContext";

import { debugOk } from "../../debug/debugLogger";

export class DevRole implements AppRole {
  readonly kind = RoleKind.Dev;
  readonly name = "DevRole";

  enter(context: UpdateContext): void {
    context.camera.attachControl(context.canvas, true);
    context.camera.checkCollisions = true;
    context.camera.applyGravity = false;
    context.camera.ellipsoid = new Vector3(0.35, 0.85, 0.35);

    debugOk("dev", "Free camera enabled");
  }

  exit(_context: UpdateContext): void {
    // PlayerRole decides how it wants to take control when it enters.
  }

  update(_context: UpdateContext): void {
    // Dev camera is handled by Babylon camera controls.
  }
}
