"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "../state/authStore";
import { AuthApi } from "../services/authApi";

export function LoginPanel() {
  const router = useRouter();
  const [, forceRender] = useState(0);

  useEffect(() => {
    const unsub = authStore.subscribe(() => forceRender((x) => x + 1));
    return unsub;
  }, []);

  const api = useMemo(() => new AuthApi({ baseUrl: "http://127.0.0.1:8000" }), []);

  const identity = authStore.getIdentity();
  const token = authStore.getToken();

  const [playerId, setPlayerId] = useState(identity?.playerId ?? "p1");
  const [playerName, setPlayerName] = useState(identity?.playerName ?? "Alice");
  const [secret, setSecret] = useState("dev");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const canLogin =
    !loading && playerId.trim().length > 0 && playerName.trim().length > 0 && secret.trim().length > 0;

  const onLogin = async (e) => {
    e.preventDefault();
    if (!canLogin) return;

    setLoading(true);
    setError(null);

    try {
      const res = await api.token({
        playerId: playerId.trim(),
        playerName: playerName.trim(),
        secret: secret.trim(),
      });

      authStore.setToken(res.access_token);
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const onLogout = () => {
    authStore.logout();
    setError(null);
    router.push("/");
    router.refresh();
  };

  const cardStyle = {
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 18,
    padding: 16,
    background: "rgba(255,255,255,0.05)",
    color: "white",
  };

  const inputStyle = {
    padding: "12px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(0,0,0,0.25)",
    color: "white",
    outline: "none",
  };

  const buttonStyle = (enabled) => ({
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.18)",
    background: enabled
      ? "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08))"
      : "rgba(255,255,255,0.05)",
    color: "white",
    cursor: enabled ? "pointer" : "not-allowed",
    fontWeight: 900,
    letterSpacing: 0.3,
    boxShadow: enabled ? "0 6px 18px rgba(0,0,0,0.35)" : "none",
    transition: "all 120ms ease-out",
  });

  const smallButtonStyle = {
    padding: "8px 10px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    cursor: "pointer",
    fontWeight: 800,
  };

  return (
    <section style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 900, letterSpacing: 0.2 }}>Sign in</div>
          <div style={{ marginTop: 4, opacity: 0.8, fontSize: 13 }}>Get a JWT and bind actions to your identity.</div>
        </div>

        {token ? (
          <button type="button" onClick={onLogout} style={smallButtonStyle}>
            Logout
          </button>
        ) : null}
      </div>

      {token ? (
        <div style={{ marginTop: 12, fontSize: 13, opacity: 0.92 }}>
          Logged in as <b>{identity?.playerName ?? "?"}</b> (<code>{identity?.playerId ?? "?"}</code>)
        </div>
      ) : (
        <form onSubmit={onLogin} style={{ marginTop: 14, display: "grid", gap: 10 }}>
          <input value={playerId} onChange={(e) => setPlayerId(e.target.value)} placeholder="Player ID" style={inputStyle} />
          <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Username" style={inputStyle} />
          <input value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="Secret" style={inputStyle} />

          <button type="submit" disabled={!canLogin} style={buttonStyle(canLogin)}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>
      )}

      {error ? (
        <div style={{ marginTop: 12, color: "rgba(255,180,180,0.95)", fontSize: 13, whiteSpace: "pre-wrap" }}>
          {error}
        </div>
      ) : null}
    </section>
  );
}