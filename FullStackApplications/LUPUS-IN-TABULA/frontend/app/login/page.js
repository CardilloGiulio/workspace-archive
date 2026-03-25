"use client";

import { LoginPanel } from "../../components/LoginPanel";

function PageShell({ children }) {
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

function TopBar() {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center" }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 28, letterSpacing: 0.2 }}>Login</h1>
        <div style={{ marginTop: 6, opacity: 0.8, fontSize: 13 }}>
          Bind actions to your player identity (JWT)
        </div>
      </div>
    </header>
  );
}

function Card({ title, subtitle, children }) {
  return (
    <section
      style={{
        marginTop: 18,
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.05)",
        borderRadius: 18,
        padding: 16,
      }}
    >
      <div style={{ fontWeight: 900 }}>{title}</div>
      {subtitle && <div style={{ marginTop: 6, opacity: 0.8, fontSize: 13 }}>{subtitle}</div>}
      <div style={{ marginTop: 12 }}>{children}</div>
    </section>
  );
}

export default function LoginPage() {
  return (
    <PageShell>
      <TopBar />

      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 16 }}>
        <Card
          title="Sign in"
          subtitle="Choose an id and username. The backend issues a JWT."
        >
          <LoginPanel />
        </Card>

        <Card
          title="How it works"
          subtitle="Dev authentication (no database, no passwords)"
        >
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, opacity: 0.9 }}>
            <li>POST /auth/token</li>
            <li>JWT stored in localStorage</li>
            <li>Lobby actions use Authorization header</li>
          </ul>
        </Card>
      </div>
    </PageShell>
  );
}