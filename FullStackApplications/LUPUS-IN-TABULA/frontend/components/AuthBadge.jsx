"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authStore } from "../state/authStore";

export default function AuthBadge({ small = false }) {
  const router = useRouter();
  const [, forceRender] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const unsub = authStore.subscribe(() => forceRender((x) => x + 1));
    return unsub;
  }, []);

  if (!mounted) return null;

  const token = authStore.getToken();
  const identity = authStore.getIdentity();

  const onLogout = () => {
    authStore.logout();
    router.push("/");
    router.refresh();
  };

  const buttonStyle = {
    padding: small ? "6px 8px" : "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "transparent",
    color: "inherit",
    cursor: "pointer",
    fontWeight: 800,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    textDecoration: "none",
  };

  if (token && identity) {
    return (
      <div style={{ display: "inline-flex", gap: 10, alignItems: "center", fontSize: small ? 12 : 14 }}>
        <div style={{ textAlign: "right", lineHeight: 1 }}>
          <div style={{ fontWeight: 900 }}>{identity.playerName}</div>
          <div style={{ opacity: 0.65, fontSize: small ? 11 : 12 }}>{identity.playerId}</div>
        </div>

        <button type="button" onClick={onLogout} style={{ ...buttonStyle, fontWeight: 700 }}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link href="/login" style={buttonStyle}>
      Login
    </Link>
  );
}
