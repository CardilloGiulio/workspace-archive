import type { UpdateContext } from "../update/UpdateContext";
import type { RoleKind } from "./RoleKind";

export interface AppRole {
  readonly kind: RoleKind;
  readonly name: string;

  enter(context: UpdateContext): void;
  exit(context: UpdateContext): void;
  update(context: UpdateContext): void;
}
