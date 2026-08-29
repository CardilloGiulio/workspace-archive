import gamesContent from "../../../../store/content/games.json";
import type { RunnerEvent } from "../types";

export const piazzaStatutoTrack: RunnerEvent[] = [
  { id: "ps-zone-msg", at: 10, lane: 1, zone: "piazzaStatuto", kind: "message", label: "manifestante", message: "Gesù salva dalla droga!" },
  { id: "ps-poster-1", at: 28, lane: 0, zone: "piazzaStatuto", kind: "obstacle", label: "poster", detail: "poster sacro", image: gamesContent.religiousImages.christIcon },
  { id: "ps-heart-1", at: 42, lane: 2, zone: "piazzaStatuto", kind: "pickup", label: "cuore", icon: "💗", detail: "+2 affetto", pickupType: "heart" },
  { id: "ps-msg-2", at: 57, lane: 2, zone: "piazzaStatuto", kind: "message", label: "cartello", message: "Prega anche tu!" },
  { id: "ps-icon-2", at: 74, lane: 2, zone: "piazzaStatuto", kind: "obstacle", label: "icona", detail: "santino volante", image: gamesContent.religiousImages.pantocrator, moving: "left" },
  { id: "ps-ice-1", at: 91, lane: 0, zone: "piazzaStatuto", kind: "pickup", label: "gelato", icon: "🍦", detail: "+3 affetto", pickupType: "iceCream" },
  { id: "ps-poster-2", at: 108, lane: 1, zone: "piazzaStatuto", kind: "obstacle", label: "poster", detail: "cartello improvviso", image: gamesContent.religiousImages.christIcon },
  { id: "ps-heart-2", at: 122, lane: 2, zone: "piazzaStatuto", kind: "pickup", label: "cuore", icon: "💗", detail: "+2 affetto", pickupType: "heart" },
  { id: "ps-dead-1a", at: 137, lane: 0, zone: "piazzaStatuto", kind: "obstacle", label: "poster", detail: "corsia chiusa", image: gamesContent.religiousImages.christIcon },
  { id: "ps-dead-1b", at: 137, lane: 1, zone: "piazzaStatuto", kind: "obstacle", label: "cartello", detail: "cartello in mezzo", image: gamesContent.religiousImages.pantocrator },
  { id: "ps-choco-1", at: 151, lane: 2, zone: "piazzaStatuto", kind: "pickup", label: "cioccolato", icon: "🍫", detail: "+2 affetto", pickupType: "chocolate" }
];
