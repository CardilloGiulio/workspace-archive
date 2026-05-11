import type { AppRole } from "../AppRole";
import { RoleKind } from "../RoleKind";
import type { UpdateContext } from "../../update/UpdateContext";
import { PlayerController } from "./PlayerController";

import { debugOk } from "../../debug/debugLogger";

export class PlayerRole implements AppRole {
  readonly kind = RoleKind.Player;
  readonly name = "PlayerRole";

  private readonly controller = new PlayerController();

  enter(context: UpdateContext): void {
    this.controller.enable(context);
    debugOk("player", "Player click-to-move enabled");
  }

  exit(context: UpdateContext): void {
    this.controller.disable(context);
    debugOk("player", "Player click-to-move disabled");
  }

  update(context: UpdateContext): void {
    this.controller.update(context);
  }
}
