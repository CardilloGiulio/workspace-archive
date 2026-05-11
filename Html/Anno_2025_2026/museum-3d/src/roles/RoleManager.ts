import type { Updatable } from "../update/Updatable";
import type { UpdateContext } from "../update/UpdateContext";
import type { AppRole } from "./AppRole";
import { RoleKind, type RoleKind as RoleKindType } from "./RoleKind";

import { debugOk, debugStep, debugWarn } from "../debug/debugLogger";

export class RoleManager implements Updatable {
  readonly name = "RoleManager";

  private readonly roles = new Map<RoleKindType, AppRole>();
  private activeRole: AppRole | null = null;
  private activeContext: UpdateContext | null = null;
  private readonly defaultRoleKind: RoleKindType;

  constructor(defaultRoleKind: RoleKindType = RoleKind.Dev) {
    this.defaultRoleKind = defaultRoleKind;
  }

  register(role: AppRole): void {
    this.roles.set(role.kind, role);
    debugOk("roles", `Registered role: ${role.name}`);
  }

  start(context: UpdateContext): void {
    this.activeContext = context;
    this.installKeyboardShortcuts();
    this.switchTo(this.defaultRoleKind);
  }

  update(context: UpdateContext): void {
    this.activeContext = context;
    this.activeRole?.update(context);
  }

  switchTo(roleKind: RoleKindType): void {
    if (!this.activeContext) {
      debugWarn("roles", "Cannot switch role before RoleManager has started");
      return;
    }

    const nextRole = this.roles.get(roleKind);

    if (!nextRole) {
      debugWarn("roles", `Role not registered: ${roleKind}`);
      return;
    }

    if (this.activeRole?.kind === nextRole.kind) {
      return;
    }

    this.activeRole?.exit(this.activeContext);
    this.activeRole = nextRole;
    this.activeRole.enter(this.activeContext);

    debugOk("roles", `Active role: ${nextRole.name}`);
  }

  private installKeyboardShortcuts(): void {
    window.addEventListener("keydown", (event) => {
      if (event.repeat) {
        return;
      }

      if (event.code === "KeyC") {
        debugStep("roles", "C pressed: switching to Dev role");
        this.switchTo(RoleKind.Dev);
        return;
      }

      if (event.code === "KeyP") {
        debugStep("roles", "P pressed: switching to Player role");
        this.switchTo(RoleKind.Player);
      }
    });
  }
}
