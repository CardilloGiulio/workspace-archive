import { commentaryLines } from "../data/commentaryLines";
import type { CommentaryLine, CommentaryTrigger, ResolvedCommentary, RunnerZoneKey } from "../types";

export const eventDrivenCommentary = new Set<CommentaryTrigger>([
  "hitObstacle",
  "collectHeart",
  "collectFries",
  "collectIceCream",
  "collectChocolate",
  "collectPotato",
  "zoneStart",
  "nearPortaSusa",
  "portaSusaLoop"
]);

export function commentaryPriority(trigger: CommentaryTrigger) {
  if (trigger === "hitObstacle") return 100;
  if (trigger.startsWith("collect")) return 86;
  if (trigger === "zoneStart") return 76;
  if (trigger === "portaSusaLoop") return 74;
  if (trigger === "nearPortaSusa") return 68;
  if (trigger === "nearRebecca" || trigger === "farFromRebecca") return 56;
  if (trigger === "sprinting") return 44;
  if (trigger === "running") return 36;
  if (trigger === "walkingTooLong") return 34;
  if (trigger === "walking") return 28;
  return 20;
}

export class CommentaryHandler {
  private recentIds: string[] = [];
  private triggerCounts: Partial<Record<CommentaryTrigger, number>> = {};
  private lineCounts: Record<string, number> = {};

  reset() {
    this.recentIds = [];
    this.triggerCounts = {};
    this.lineCounts = {};
  }

  getTriggerCount(trigger: CommentaryTrigger) {
    return this.triggerCounts[trigger] ?? 0;
  }

  pickLeastUsedTrigger(triggers: CommentaryTrigger[]) {
    if (triggers.length === 0) return undefined;

    return [...triggers].sort((a, b) => {
      const countDiff = this.getTriggerCount(a) - this.getTriggerCount(b);
      if (countDiff !== 0) return countDiff;

      const priority: Partial<Record<CommentaryTrigger, number>> = {
        portaSusaLoop: 1,
        nearPortaSusa: 2,
        nearRebecca: 3,
        farFromRebecca: 3,
        sprinting: 4,
        running: 5,
        walkingTooLong: 5,
        walking: 6
      };

      return (priority[a] ?? 10) - (priority[b] ?? 10);
    })[0];
  }

  resolve(trigger: CommentaryTrigger, zoneKey: RunnerZoneKey, urgent = false): ResolvedCommentary | undefined {
    const pool = commentaryLines.filter(
      (line) => line.trigger === trigger && (!line.zone || line.zone === zoneKey)
    );

    if (pool.length === 0) return undefined;

    const notRecent = pool.filter((line) => !this.recentIds.includes(line.id));
    const choices = notRecent.length > 0 ? notRecent : pool;
    const leastUsedCount = Math.min(...choices.map((line) => this.getLineCount(line.id)));
    const leastUsedChoices = choices.filter((line) => this.getLineCount(line.id) === leastUsedCount);
    const line = leastUsedChoices[Math.floor(Math.random() * leastUsedChoices.length)];
    this.remember(line);

    return {
      line,
      trigger: line.trigger,
      zoneKey,
      urgent,
      priority: commentaryPriority(trigger),
      message: this.format(line)
    };
  }

  private getLineCount(id: string) {
    return this.lineCounts[id] ?? 0;
  }

  private remember(line: CommentaryLine) {
    this.triggerCounts[line.trigger] = this.getTriggerCount(line.trigger) + 1;
    this.lineCounts[line.id] = this.getLineCount(line.id) + 1;
    this.recentIds = [line.id, ...this.recentIds.filter((id) => id !== line.id)].slice(0, 8);
  }

  private format(line: CommentaryLine) {
    return [
      line.giulio ? `Giulio: «${line.giulio}»` : "",
      line.rebecca ? `Rebecca: «${line.rebecca}»` : ""
    ]
      .filter(Boolean)
      .join("\n");
  }
}
