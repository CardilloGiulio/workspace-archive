export const RoleKind = {
  Dev: "dev",
  Player: "player",
} as const;

export type RoleKind = (typeof RoleKind)[keyof typeof RoleKind];
