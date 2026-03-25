"use client";

export default function RoleBadge({ label }) {
  if (!label) return null;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(255,255,255,0.05)",
        fontSize: 12,
        fontWeight: 900,
        letterSpacing: 0.2,
      }}
    >
      {label}
    </span>
  );
}