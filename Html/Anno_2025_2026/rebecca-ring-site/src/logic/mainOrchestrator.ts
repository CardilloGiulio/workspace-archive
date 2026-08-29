import type { Trigger } from "./types";
import { routeTrigger } from "./triggerRouter";

export const mainOrchestrator = {
  dispatch(trigger: Trigger) {
    routeTrigger(trigger);
  }
};
