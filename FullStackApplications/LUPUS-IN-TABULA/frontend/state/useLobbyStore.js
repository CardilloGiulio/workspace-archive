"use client";

import { useSyncExternalStore } from "react";
import { lobbyStore } from "./lobbyStore";

export function useLobbyStore() {
  const state = useSyncExternalStore(
    (cb) => lobbyStore.subscribe(cb),
    () => lobbyStore.getState(),
    () => lobbyStore.getState()
  );

  return { state, actions: lobbyStore };
}