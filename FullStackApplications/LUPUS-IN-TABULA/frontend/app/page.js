"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import LobbyList from "../components/LobbyList";
import AuthBadge from "../components/AuthBadge";
import { useLobbyStore } from "../state/useLobbyStore";

export default function HomePage() {
  const router = useRouter();
  const { state, actions } = useLobbyStore();

  const [lobbyId, setLobbyId] = useState("");
  const [lobbyName, setLobbyName] = useState("");

  useEffect(() => {
    actions.load();
  }, [actions]);

  const canCreate = useMemo(() => {
    return lobbyId.trim().length > 0 && lobbyName.trim().length > 0 && !state.loading;
  }, [lobbyId, lobbyName, state.loading]);

  const onOpen = (id) => router.push(`/lobby/${encodeURIComponent(id)}`);

  const onCreate = async (e) => {
    e.preventDefault();
    if (!canCreate) return;
    const created = await actions.createLobby({ lobbyId: lobbyId.trim(), name: lobbyName.trim() });
    if (created) router.push(`/lobby/${encodeURIComponent(created.id())}`);
  };

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
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, letterSpacing: 0.2 }}>Lupus in Tabula</h1>
            <div style={{ marginTop: 6, opacity: 0.8, fontSize: 13 }}>Dev lobbies (FastAPI + Next.js)</div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <AuthBadge />

            <a
              href="http://127.0.0.1:8000/docs"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: "white",
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.06)",
                padding: "10px 12px",
                borderRadius: 12,
                fontSize: 13,
              }}
            >
              Open API Docs
            </a>
          </div>
        </header>

        <section
          style={{
            marginTop: 18,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)",
            borderRadius: 18,
            padding: 16,
          }}
        >
          <div style={{ opacity: 0.85, fontSize: 13, marginBottom: 10 }}>
            Tip: use <b>Login</b> to bind actions to your identity (JWT), then create or join a lobby.
          </div>

          <form onSubmit={onCreate} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10 }}>
            <input
              value={lobbyId}
              onChange={(e) => setLobbyId(e.target.value)}
              placeholder="Lobby ID (e.g. lobby-1)"
              style={{
                padding: "12px 12px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(0,0,0,0.25)",
                color: "white",
                outline: "none",
              }}
            />
            <input
              value={lobbyName}
              onChange={(e) => setLobbyName(e.target.value)}
              placeholder="Lobby name (e.g. Friday Night)"
              style={{
                padding: "12px 12px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(0,0,0,0.25)",
                color: "white",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={!canCreate}
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.16)",
                background: canCreate ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)",
                color: "white",
                cursor: canCreate ? "pointer" : "not-allowed",
                fontWeight: 700,
              }}
            >
              Create
            </button>
          </form>

          {state.error && (
            <div style={{ marginTop: 10, color: "rgba(255,180,180,0.95)", fontSize: 13 }}>{state.error}</div>
          )}
        </section>

        <section style={{ marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ opacity: 0.85, fontSize: 13 }}>
              {state.loading ? "Loading..." : `${state.lobbies.length} lobbies`}
            </div>
            <button
              type="button"
              onClick={() => actions.load()}
              disabled={state.loading}
              style={{
                padding: "8px 10px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                cursor: state.loading ? "not-allowed" : "pointer",
                fontSize: 13,
              }}
            >
              Refresh
            </button>
          </div>

          <LobbyList lobbies={state.lobbies} onOpen={onOpen} />
        </section>
      </div>
    </main>
  );
}