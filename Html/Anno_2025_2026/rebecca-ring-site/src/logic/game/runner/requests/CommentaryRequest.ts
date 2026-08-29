import { commentaryPriority } from "../handlers/CommentaryHandler";
import type { CommentaryTrigger, PendingCommentaryRequest, RunnerZoneKey } from "../types";

export function createCommentaryRequest(
  trigger: CommentaryTrigger,
  zoneKey: RunnerZoneKey,
  urgent = false
): PendingCommentaryRequest {
  return {
    trigger,
    zoneKey,
    urgent,
    priority: commentaryPriority(trigger)
  };
}
