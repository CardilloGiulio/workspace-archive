import type { RoleRule } from "../../RoleRule";
import type { UpdateContext } from "../../../update/UpdateContext";

export class DevCameraRule implements RoleRule {
  readonly name = "DevCameraRule";

  enter(context: UpdateContext): void {
    context.camera.attachControl(context.canvas, true);
  }
}
