"use client";

import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLobbyStore } from "../../../state/useLobbyStore";
import { authStore } from "../../../state/authStore";
import PageShell from "../../../components/ui/PageShell";
import TopBar from "../../../components/ui/TopBar";
import LobbyStatePanel from "../../../components/game/LobbyStatePanel";
import MembershipPanel from "../../../components/game/MembershipPanel";
import { resolveMembership, resolveRoleLabel } from "../../../domain/resolveRole";

export default function GamePage() {
  const router = useRouter();
  const params = useParams();
  const lobbyId = decodeURIComponent(params.id);

  const { state, actions } = useLobbyStore();

  useEffect(() => {
    if (state.lobbies.length === 0) actions.load();
  }, [actions, state.lobbies.length]);

  const lobby = useMemo(() => state.lobbies.find((l) => l.id() === lobbyId) ?? null, [state.lobbies, lobbyId]);

  const me = authStore.getIdentity();
  const myId = me?.playerId ?? null;

  const membership = useMemo(() => resolveMembership(lobby, myId), [lobby, myId]);
  const isCreator = useMemo(() => (lobby ? myId === lobby.creatorId() : false), [lobby, myId]);
  const roleLabel = useMemo(() => resolveRoleLabel({ membership, isCreator }), [membership, isCreator]);

  const viewingLabel = useMemo(() => {
    if (!lobby) return null;
    if (membership !== "none") return null;
    return "Viewing lobby (not joined)";
  }, [lobby, membership]);

  const title = lobby ? lobby.name() : "Game";
  const subtitle = `ID: ${lobbyId}`;

  const hint = useMemo(() => {
    if (!lobby) return null;
    if (membership !== "none") return null;
    const s = lobby.status();
    if (s === "RUNNING") return "Join will place you as spectator.";
    return "Join will place you as player.";
  }, [lobby, membership]);

  useEffect(() => {
    if (state.errorStatus === 404) router.push("/");
    if (state.errorStatus === 401) router.push("/login");
  }, [router, state.errorStatus]);

  const handleBack = () => {
    const hasHistory = typeof window !== "undefined" && window.history.length > 1;

    if (hasHistory) {
      router.back();
      return;
    }

    const lobbyRoute = `/lobby/${encodeURIComponent(lobbyId)}`;
    router.push(lobbyRoute);

    setTimeout(() => {
      router.push("/");
    }, 250);
  };

  const handleRefresh = async () => {
    if (state.loading) return;
    await actions.load();
  };

  const handleJoin = async () => {
    if (state.loading) return;
    await actions.joinLobby({ lobbyId });
    await actions.load();
  };

  const handleLeave = async () => {
    if (state.loading) return;
    const result = await actions.leaveLobby({ lobbyId });
    if (result === null) {
      router.push("/");
      return;
    }
    await actions.load();
  };

  return (
    <PageShell>
      <TopBar title={title} subtitle={subtitle} onBack={handleBack} />

      <LobbyStatePanel
        lobby={lobby}
        loading={state.loading}
        roleLabel={roleLabel}
        viewingLabel={viewingLabel}
        onRefresh={handleRefresh}
      />

      <MembershipPanel
        membership={membership}
        loading={state.loading}
        hint={hint}
        error={state.error}
        onJoin={handleJoin}
        onLeave={handleLeave}
      />
    </PageShell>
  );
}