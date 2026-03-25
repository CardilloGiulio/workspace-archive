"use client";

import Panel from "../ui/Panel";
import Chip from "../ui/Chip";
import { SecondaryButton } from "../ui/Buttons";
import RoleBadge from "./RoleBadge";

function ChipsList({ items, emptyText }) {
  if (!items || items.length === 0) return <div style={{ opacity: 0.8 }}>{emptyText}</div>;

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {items.map((p) => (
        <Chip key={p.id()}>
          {p.name()} · {p.id()}
        </Chip>
      ))}
    </div>
  );
}

export default function LobbyStatePanel({ lobby, loading, roleLabel, viewingLabel, onRefresh }) {
  const status = lobby ? lobby.status() : "WAITING";
  const players = lobby ? lobby.players() : [];
  const spectators = lobby ? lobby.spectators() : [];

  return (
    <Panel title="Lobby state">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div style={{ opacity: 0.85, fontSize: 13 }}>{loading ? "Syncing..." : `Status: ${status}`}</div>
          {roleLabel ? <RoleBadge label={roleLabel} /> : null}
          {!roleLabel && viewingLabel ? <div style={{ opacity: 0.8, fontSize: 13 }}>{viewingLabel}</div> : null}
        </div>

        <SecondaryButton onClick={onRefresh} type="button" disabled={loading}>
          Refresh
        </SecondaryButton>
      </div>

      <div style={{ marginTop: 14, fontWeight: 900, opacity: 0.9 }}>Players</div>
      <div style={{ marginTop: 10 }}>
        <ChipsList items={players} emptyText="No players yet." />
      </div>

      <div style={{ marginTop: 14, fontWeight: 900, opacity: 0.9 }}>Spectators</div>
      <div style={{ marginTop: 10 }}>
        <ChipsList items={spectators} emptyText="No spectators." />
      </div>
    </Panel>
  );
}