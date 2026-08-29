import type { Trigger } from "../types";

// Versioned key: older prototypes may have unlocked the old key already.
// This prevents stale localStorage from bypassing the current lock.
const STORAGE_KEY = "rebecca-game-completed-stage1-vertical-v9";
const COMPLETED_AT_KEY = "rebecca-game-completed-stage1-vertical-v9-at";

export function handleGameCompleted(
  trigger: Extract<Trigger, { type: "GAME_COMPLETED" }>
) {
  localStorage.setItem(STORAGE_KEY, "true");
  localStorage.setItem(COMPLETED_AT_KEY, trigger.payload.completedAt);
}

export function handleGameReset() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(COMPLETED_AT_KEY);
}

export function isGameCompleted() {
  return localStorage.getItem(STORAGE_KEY) === "true";
}
