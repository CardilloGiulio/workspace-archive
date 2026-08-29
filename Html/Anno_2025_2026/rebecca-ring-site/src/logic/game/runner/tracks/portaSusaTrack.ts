import type { RunnerEvent } from "../types";

export const portaSusaTrack: RunnerEvent[] = [
  { id: "pss-msg-1", at: 332, lane: 1, zone: "portaSusa", kind: "message", label: "cassiere", message: "Ma perché stanno correndo?" },
  { id: "pss-staff-1", at: 346, lane: 0, zone: "portaSusa", kind: "obstacle", label: "staff", icon: "🧑‍🍳", detail: "staff: non si corre!", moving: "right" },
  { id: "pss-fries-1", at: 360, lane: 2, zone: "portaSusa", kind: "pickup", label: "patatine", icon: "🍟", detail: "+2 affetto", pickupType: "fries" },
  { id: "pss-tray-1", at: 376, lane: 1, zone: "portaSusa", kind: "obstacle", label: "vassoio", icon: "🥤", detail: "vassoio scivolato" },
  { id: "pss-heart-1", at: 390, lane: 0, zone: "portaSusa", kind: "pickup", label: "cuore", icon: "💗", detail: "+2 affetto", pickupType: "heart" },
  { id: "pss-manager-1", at: 404, lane: 2, zone: "portaSusa", kind: "obstacle", label: "manager", icon: "👨‍💼", detail: "manager in missione", moving: "left" },
  { id: "pss-ice-1", at: 418, lane: 1, zone: "portaSusa", kind: "pickup", label: "gelato", icon: "🍦", detail: "+3 affetto", pickupType: "iceCream" },
  { id: "pss-msg-2", at: 431, lane: 2, zone: "portaSusa", kind: "message", label: "manager", message: "Qualcuno fermi quei due!" },
  { id: "pss-staff-2a", at: 444, lane: 0, zone: "portaSusa", kind: "obstacle", label: "staff", icon: "🧑‍🍳", detail: "staff in panico" },
  { id: "pss-staff-2b", at: 444, lane: 2, zone: "portaSusa", kind: "obstacle", label: "cassiere", icon: "🧑‍💼", detail: "blocca la corsia" },
  { id: "pss-fries-2", at: 457, lane: 1, zone: "portaSusa", kind: "pickup", label: "patatine", icon: "🍟", detail: "+2 affetto", pickupType: "fries" },
  { id: "pss-tray-2", at: 468, lane: 0, zone: "portaSusa", kind: "obstacle", label: "vassoio", icon: "🥤", detail: "vassoio lanciato", moving: "right" },
  { id: "pss-heart-2", at: 476, lane: 2, zone: "portaSusa", kind: "pickup", label: "cuore", icon: "💗", detail: "+2 affetto", pickupType: "heart" }
];
