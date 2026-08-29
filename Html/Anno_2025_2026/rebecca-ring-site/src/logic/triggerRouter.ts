import type { Trigger } from "./types";
import { handlePageOpen } from "./handlers/pageOpenHandler";
import {
  handleGameCompleted,
  handleGameReset
} from "./handlers/gameProgressHandler";
import { handleFinalSceneStarted } from "./handlers/finalSceneHandler";

export function routeTrigger(trigger: Trigger) {
  switch (trigger.type) {
    case "PAGE_OPENED":
      handlePageOpen(trigger);
      break;

    case "GAME_COMPLETED":
      handleGameCompleted(trigger);
      break;

    case "GAME_RESET":
      handleGameReset();
      break;

    case "FINAL_SCENE_STARTED":
      handleFinalSceneStarted();
      break;

    default:
      assertNever(trigger);
  }
}

function assertNever(value: never): never {
  throw new Error(`Trigger non gestito: ${JSON.stringify(value)}`);
}
