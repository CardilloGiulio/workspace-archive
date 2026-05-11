import type { UpdateContext } from "../update/UpdateContext";

export interface RoleRule {
  readonly name: string;

  enter?(context: UpdateContext): void;
  exit?(context: UpdateContext): void;
  update?(context: UpdateContext): void;
}
