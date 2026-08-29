import { runnerConfig } from "../config";
import type { RunnerEvent } from "../types";

export function getEventY(progress: number, eventAt: number) {
  return 48 + (progress - eventAt) * 34;
}

export function getEventLane(event: RunnerEvent, progress: number): 0 | 1 | 2 {
  if (!event.moving) return event.lane;

  const travel = Math.min(1, Math.max(0, (progress - event.at) / 18));
  if (travel < 0.33) return event.lane;
  if (travel < 0.66) return 1;
  return event.moving === "right" ? 2 : 0;
}

export function isPlayerCollision(progress: number, event: RunnerEvent, lane: 0 | 1 | 2) {
  const y = getEventY(progress, event.at);
  return Math.abs(y - runnerConfig.playerY) < runnerConfig.collisionWindow && getEventLane(event, progress) === lane;
}

export function clampLane(lane: number): 0 | 1 | 2 {
  return Math.max(0, Math.min(2, lane)) as 0 | 1 | 2;
}
