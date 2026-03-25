"use client";

export default function PageShell({ children }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 24,
        color: "white",
        background:
          "radial-gradient(900px 420px at 20% 10%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(900px 420px at 80% 0%, rgba(255,255,255,0.06), transparent 55%), #0b0f17",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>{children}</div>
    </main>
  );
}
