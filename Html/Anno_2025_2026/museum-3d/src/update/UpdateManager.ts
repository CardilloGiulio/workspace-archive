import type { BabylonApp } from "../setup/BabylonApp";
import type { Updatable } from "./Updatable";
import type { UpdateContext } from "./UpdateContext";

import {
  debugOk,
  debugStep,
} from "../debug/debugLogger";

export class UpdateManager {
  private readonly systems: Updatable[] = [];
  private readonly context: UpdateContext;
  private hasStarted = false;

  constructor(app: BabylonApp) {
    this.context = {
      engine: app.engine,
      scene: app.scene,
      camera: app.camera,
      deltaTime: 0,
    };
  }

  add(system: Updatable): void {
    this.systems.push(system);
    debugOk("update", `System registered: ${system.name}`);
  }

  start(): void {
    if (this.hasStarted) {
      return;
    }

    debugStep("update", "Starting update systems");

    for (const system of this.systems) {
      system.start?.(this.context);
    }

    this.hasStarted = true;
    debugOk("update", `Update systems started: ${this.systems.length}`);
  }

  update(): void {
    this.context.deltaTime = this.context.engine.getDeltaTime() / 1000;

    for (const system of this.systems) {
      system.update(this.context);
    }
  }
}
