import type { RoleRule } from "../../RoleRule";
import type { UpdateContext } from "../../../update/UpdateContext";

export class PlayerCameraRule implements RoleRule {
  readonly name = "PlayerCameraRule";

  enter(context: UpdateContext): void {
    // Player mode should not use free WASD/mouse camera controls.
    // Click-to-move and aim-dot rules will be added as separate Player rules later.
    context.camera.detachControl();
  }

  exit(context: UpdateContext): void {
    // Returning to Dev mode must always restore free camera controls.
    context.camera.attachControl(context.canvas, true);
  }
}
