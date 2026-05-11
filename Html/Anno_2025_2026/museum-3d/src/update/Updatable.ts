import type { UpdateContext } from "./UpdateContext";

export interface Updatable {
  readonly name: string;

  start?(context: UpdateContext): void;
  update(context: UpdateContext): void;
}
