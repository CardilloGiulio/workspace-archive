"use client";

import AuthBadge from "../AuthBadge";

export default function TopBar({ title, subtitle, onBack }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
      <button
        type="button"
        onClick={onBack}
        style={{
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.16)",
          background: "rgba(255,255,255,0.06)",
          color: "white",
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        ← Back
      </button>

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 900 }}>{title}</div>
        {subtitle ? <div style={{ opacity: 0.75, fontSize: 12 }}>{subtitle}</div> : null}
      </div>

      <div style={{ textAlign: "right" }}>
        <AuthBadge small />
      </div>
    </div>
  );
}