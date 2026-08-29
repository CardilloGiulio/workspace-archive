export type RunnerStatus = "tutorial" | "running" | "failed" | "completed";
export type RunnerKind = "obstacle" | "pickup" | "message";
export type RunnerZoneKey = "piazzaStatuto" | "market" | "portaSusa";
export type PickupType = "heart" | "iceCream" | "fries" | "chocolate" | "potato";

export type CommentaryTrigger =
  | "walking"
  | "walkingTooLong"
  | "running"
  | "sprinting"
  | "portaSusaLoop"
  | "hitObstacle"
  | "collectHeart"
  | "collectFries"
  | "collectIceCream"
  | "collectChocolate"
  | "collectPotato"
  | "nearRebecca"
  | "farFromRebecca"
  | "zoneStart"
  | "nearPortaSusa";

export type RunnerEvent = {
  id: string;
  at: number;
  lane: 0 | 1 | 2;
  zone: RunnerZoneKey;
  kind: RunnerKind;
  label: string;
  detail?: string;
  icon?: string;
  image?: string;
  message?: string;
  moving?: "left" | "right";
  pickupType?: PickupType;
};

export type RunnerZone = {
  key: RunnerZoneKey;
  name: string;
  subtitle: string;
  start: number;
  end: number;
  image: string;
};

export type RunnerState = {
  status: RunnerStatus;
  progress: number;
  lane: 0 | 1 | 2;
  mistakes: number;
  affection: number;
  distance: number;
  isRunning: boolean;
  runCharge: number;
  portaSusaLoopStarted: boolean;
  hitIds: string[];
  collectedIds: string[];
  message: string;
  currentCommentTrigger?: CommentaryTrigger;
  commentaryToken: number;
  lastCommentAt: number;
  lastCommentAtMs: number;
  currentZoneKey: RunnerZoneKey;
};

export type CommentaryLine = {
  id: string;
  trigger: CommentaryTrigger;
  zone?: RunnerZoneKey;
  giulio?: string;
  rebecca?: string;
  giulioAudio?: string;
  rebeccaAudio?: string;
};

export type ResolvedCommentary = {
  line: CommentaryLine;
  message: string;
  trigger: CommentaryTrigger;
  zoneKey: RunnerZoneKey;
  urgent: boolean;
  priority: number;
};

export type PendingCommentaryRequest = {
  trigger: CommentaryTrigger;
  zoneKey: RunnerZoneKey;
  urgent: boolean;
  priority: number;
};

export type ObjectInteraction = {
  kind: "hit" | "pickup" | "message";
  event: RunnerEvent;
  trigger?: CommentaryTrigger;
  gainedAffection?: number;
  distanceDelta?: number;
};
