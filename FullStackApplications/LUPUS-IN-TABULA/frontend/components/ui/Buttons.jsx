"use client";

export function PrimaryButton({ disabled, onClick, children, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "12px 14px",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.16)",
        background: disabled ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.12)",
        color: "white",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 900,
      }}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ onClick, children, type = "button", disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "12px 14px",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.16)",
        background: "rgba(255,255,255,0.06)",
        color: "white",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 800,
        opacity: disabled ? 0.7 : 1,
      }}
    >
      {children}
    </button>
  );
}
