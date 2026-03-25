function hasId(list, myId) {
  if (!myId) return false;
  return (list || []).some((p) => p.id() === myId);
}

export function resolveMembership(lobby, myId) {
  if (!lobby || !myId) return "none";
  if (hasId(lobby.players(), myId)) return "player";
  if (hasId(lobby.spectators(), myId)) return "spectator";
  return "none";
}

export function resolveRoleLabel({ membership, isCreator }) {
  if (membership === "none") return null;

  const base = membership === "player" ? "Player" : "Spectator";
  return isCreator ? `${base} (Admin)` : base;
}
