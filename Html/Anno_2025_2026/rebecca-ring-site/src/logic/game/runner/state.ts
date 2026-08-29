import type { RunnerState } from "./types";

export const initialRunnerState: RunnerState = {
  status: "tutorial",
  progress: 0,
  lane: 1,
  mistakes: 0,
  affection: 0,
  distance: 100,
  isRunning: false,
  runCharge: 0,
  portaSusaLoopStarted: false,
  hitIds: [],
  collectedIds: [],
  message: "Rebecca parte avanti. Distanza 100: più scende, più le sei vicino.",
  currentCommentTrigger: undefined,
  commentaryToken: 0,
  lastCommentAt: -99,
  lastCommentAtMs: -99999,
  currentZoneKey: "piazzaStatuto"
};
