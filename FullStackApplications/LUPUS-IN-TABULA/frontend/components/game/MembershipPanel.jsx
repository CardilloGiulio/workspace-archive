"use client";

import Panel from "../ui/Panel";
import { PrimaryButton, SecondaryButton } from "../ui/Buttons";

export default function MembershipPanel({ membership, loading, hint, error, onJoin, onLeave }) {
  const showJoin = membership === "none";
  const showLeave = membership !== "none";

  return (
    <Panel title="Actions">
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        {showJoin ? (
          <PrimaryButton disabled={loading} onClick={onJoin}>
            Join (as me)
          </PrimaryButton>
        ) : null}

        {showLeave ? (
          <SecondaryButton disabled={loading} onClick={onLeave}>
            Leave (as me)
          </SecondaryButton>
        ) : null}

        {hint ? <div style={{ opacity: 0.8, fontSize: 13 }}>{hint}</div> : null}
      </div>

      {error ? (
        <div style={{ marginTop: 12, color: "rgba(255,180,180,0.95)", fontSize: 13 }}>{error}</div>
      ) : null}
    </Panel>
  );
}
