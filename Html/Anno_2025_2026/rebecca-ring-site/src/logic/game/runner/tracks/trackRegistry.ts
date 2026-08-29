import gamesContent from "../../../../store/content/games.json";
import type { RunnerEvent, RunnerZone, RunnerZoneKey } from "../types";
import { piazzaStatutoTrack } from "./piazzaStatutoTrack";
import { mercatoTrack } from "./mercatoTrack";
import { portaSusaTrack } from "./portaSusaTrack";

export const zones: RunnerZone[] = [
  {
    key: "piazzaStatuto",
    name: "Piazza Statuto",
    subtitle: "Manifestazione, cartelli e qualcuno che legge le Scritture.",
    start: 0,
    end: 160,
    image: gamesContent.backgrounds.piazzaStatuto
  },
  {
    key: "market",
    name: "Il mercato",
    subtitle: "Patate in cambio di oggetti utili per continuare il viaggio.",
    start: 160,
    end: 320,
    image: gamesContent.backgrounds.market
  },
  {
    key: "portaSusa",
    name: "Porta Susa",
    subtitle: "McDonald’s, staff confuso e Rebecca che punta alla metro.",
    start: 320,
    end: 482,
    image: gamesContent.backgrounds.portaSusa
  }
];

export const runnerEvents: RunnerEvent[] = [
  ...piazzaStatutoTrack,
  ...mercatoTrack,
  ...portaSusaTrack
];

export const audioTracks: Record<RunnerZoneKey, Array<{ src: string; volume: number }>> = {
  piazzaStatuto: [
    { src: "/audio/stage-piazza-manifestation.mp3", volume: 0.18 },
    { src: "/audio/stage-piazza-scripture.mp3", volume: 0.075 }
  ],
  market: [{ src: "/audio/stage-mercato.mp3", volume: 0.22 }],
  portaSusa: [{ src: "/audio/stage-porta-susa.mp3", volume: 0.34 }]
};

export function getZone(progress: number) {
  return zones.find((zone) => progress >= zone.start && progress < zone.end) ?? zones[zones.length - 1];
}

export function clearPortaSusaEventMemory<T extends { hitIds: string[]; collectedIds: string[] }>(state: T): T {
  return {
    ...state,
    hitIds: state.hitIds.filter((id) => !id.startsWith("pss-")),
    collectedIds: state.collectedIds.filter((id) => !id.startsWith("pss-"))
  };
}
