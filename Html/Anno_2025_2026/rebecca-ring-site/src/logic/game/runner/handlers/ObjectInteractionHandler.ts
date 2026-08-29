import { runnerDebug } from "../../../../debug/runnerDebug";
import type { CommentaryTrigger, ObjectInteraction, PickupType, RunnerEvent, RunnerState, RunnerZoneKey } from "../types";

function pickupAffection(type?: PickupType) {
  if (type === "iceCream") return 3;
  if (type === "heart" || type === "fries" || type === "chocolate") return 2;
  if (type === "potato") return 1;
  return 1;
}

function pickupDistanceBonus(type?: PickupType) {
  if (type === "iceCream") return 7;
  if (type === "heart") return 5;
  if (type === "fries" || type === "chocolate") return 4;
  return 2;
}

export function pickupTrigger(type?: PickupType): CommentaryTrigger {
  if (type === "iceCream") return "collectIceCream";
  if (type === "fries") return "collectFries";
  if (type === "chocolate") return "collectChocolate";
  if (type === "potato") return "collectPotato";
  return "collectHeart";
}

export class ObjectInteractionHandler {
  recognize(event: RunnerEvent): ObjectInteraction | undefined {
    if (event.kind === "obstacle") {
      return { kind: "hit", event, trigger: "hitObstacle", distanceDelta: 12 };
    }

    if (event.kind === "pickup") {
      return {
        kind: "pickup",
        event,
        trigger: pickupTrigger(event.pickupType),
        gainedAffection: pickupAffection(event.pickupType),
        distanceDelta: -pickupDistanceBonus(event.pickupType)
      };
    }

    if (event.kind === "message") {
      return { kind: "message", event };
    }

    return undefined;
  }

  applyInteraction(
    state: RunnerState,
    interaction: ObjectInteraction,
    zoneKey: RunnerZoneKey,
    clampDistance: (value: number) => number
  ): { state: RunnerState; trigger?: CommentaryTrigger; urgent: boolean } {
    runnerDebug.objectRecognized({
      id: interaction.event.id,
      objectKind: interaction.kind,
      label: interaction.event.label,
      pickupType: interaction.event.pickupType,
      trigger: interaction.trigger,
      zoneKey
    });

    if (interaction.kind === "hit") {
      const mistakes = state.mistakes + 1;
      return {
        state: {
          ...state,
          mistakes,
          distance: clampDistance(state.distance + Math.abs(interaction.distanceDelta ?? 12)),
          hitIds: [...state.hitIds, interaction.event.id]
        },
        trigger: "hitObstacle",
        urgent: true
      };
    }

    if (interaction.kind === "pickup") {
      return {
        state: {
          ...state,
          affection: state.affection + (interaction.gainedAffection ?? 1),
          distance: clampDistance(state.distance + (interaction.distanceDelta ?? 0)),
          collectedIds: [...state.collectedIds, interaction.event.id]
        },
        trigger: interaction.trigger,
        urgent: false
      };
    }

    return { state, urgent: false };
  }
}
