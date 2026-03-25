"use client";

export default function Panel({ title, children }) {
  return (
    <section
      style={{
        marginTop: 16,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.05)",
        borderRadius: 18,
        padding: 16,
      }}
    >
      {title ? (
        <div style={{ fontWeight: 900, marginBottom: 12, letterSpacing: 0.2 }}>{title}</div>
      ) : null}
      {children}
    </section>
  );
}
