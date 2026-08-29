import type { RunnerEvent } from "../types";

export const mercatoTrack: RunnerEvent[] = [
  { id: "mk-msg-1", at: 170, lane: 1, zone: "market", kind: "message", label: "mercato", message: "3 patate per una bussola?" },
  { id: "mk-potato-pick", at: 186, lane: 2, zone: "market", kind: "pickup", label: "patata", icon: "🥔", detail: "+1 affetto", pickupType: "potato" },
  { id: "mk-potato-obstacle", at: 202, lane: 0, zone: "market", kind: "obstacle", label: "patata", icon: "🥔", detail: "patata rotolante" },
  { id: "mk-person-1", at: 220, lane: 0, zone: "market", kind: "obstacle", label: "persona", icon: "🧍‍♂️", detail: "ti taglia la strada", moving: "right" },
  { id: "mk-fries-1", at: 236, lane: 1, zone: "market", kind: "pickup", label: "patatine", icon: "🍟", detail: "+2 affetto", pickupType: "fries" },
  { id: "mk-msg-2", at: 252, lane: 0, zone: "market", kind: "message", label: "scambio", message: "Scambio patate per biglietto!" },
  { id: "mk-crate-1", at: 268, lane: 1, zone: "market", kind: "obstacle", label: "cassetta", icon: "🥔", detail: "cassetta di patate" },
  { id: "mk-person-2", at: 284, lane: 2, zone: "market", kind: "obstacle", label: "cliente", icon: "🧍‍♀️", detail: "scambio improvviso", moving: "left" },
  { id: "mk-heart-1", at: 296, lane: 0, zone: "market", kind: "pickup", label: "cuore", icon: "💗", detail: "+2 affetto", pickupType: "heart" },
  { id: "mk-dead-1a", at: 309, lane: 0, zone: "market", kind: "obstacle", label: "persona", icon: "🧍‍♂️", detail: "cliente fermo" },
  { id: "mk-dead-1b", at: 309, lane: 2, zone: "market", kind: "obstacle", label: "patate", icon: "🥔", detail: "sacco di patate" },
  { id: "mk-choco-1", at: 318, lane: 1, zone: "market", kind: "pickup", label: "cioccolato", icon: "🍫", detail: "+2 affetto", pickupType: "chocolate" }
];
