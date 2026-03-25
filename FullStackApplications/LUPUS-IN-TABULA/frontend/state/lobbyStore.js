import { LobbyApi } from "../services/lobbyApi";
import { ApiError } from "../services/apiError";
import { authStore } from "./authStore";

class LobbyStore {
  constructor({ api } = {}) {
    this._api =
      api ??
      new LobbyApi({
        baseUrl: "http://127.0.0.1:8000",
        getToken: () => authStore.getToken(),
      });

    this._state = {
      lobbies: [],
      loading: false,
      error: null,
      errorStatus: null,
      errorAction: null,
    };

    this._listeners = new Set();
  }

  getState() {
    return this._state;
  }

  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  _setState(patch) {
    this._state = { ...this._state, ...patch };
    for (const l of this._listeners) l();
  }

  _clearError() {
    this._setState({ error: null, errorStatus: null, errorAction: null });
  }

  _normalizeError(e) {
    if (e instanceof ApiError) {
      const status = e.status;
      const msg = e.detail || e.message || `HTTP ${status}`;

      if (status === 401) return { message: "Login required", status, action: "login" };
      if (status === 403) return { message: msg || "Not allowed", status, action: "forbidden" };
      if (status === 404) return { message: msg || "Not found", status, action: "not_found" };
      if (status === 409) return { message: msg || "Conflict", status, action: "conflict" };

      return { message: msg || "Request failed", status, action: "error" };
    }

    const message = e instanceof Error ? e.message : String(e);
    return { message, status: null, action: "error" };
  }

  _applyError(e) {
    const info = this._normalizeError(e);
    this._setState({
      error: info.message,
      errorStatus: info.status,
      errorAction: info.action,
      loading: false,
    });
    return info;
  }

  async load() {
    this._setState({ loading: true });
    this._clearError();
    try {
      const lobbies = await this._api.listLobbies();
      this._setState({ lobbies, loading: false });
      return lobbies;
    } catch (e) {
      this._applyError(e);
      return null;
    }
  }

  async createLobby({ lobbyId, name }) {
    this._setState({ loading: true });
    this._clearError();
    try {
      const lobby = await this._api.createLobby({ lobbyId, name });
      const lobbies = [...this._state.lobbies, lobby];
      this._setState({ lobbies, loading: false });
      return lobby;
    } catch (e) {
      this._applyError(e);
      return null;
    }
  }

  async joinLobby({ lobbyId }) {
    this._setState({ loading: true });
    this._clearError();
    try {
      const updated = await this._api.joinLobby({ lobbyId });
      const lobbies = this._state.lobbies.map((l) => (l.id() === lobbyId ? updated : l));
      this._setState({ lobbies, loading: false });
      return updated;
    } catch (e) {
      this._applyError(e);
      return null;
    }
  }

  async leaveLobby({ lobbyId }) {
    this._setState({ loading: true });
    this._clearError();
    try {
      const updated = await this._api.leaveLobby({ lobbyId });

      if (updated === null) {
        const lobbies = this._state.lobbies.filter((l) => l.id() !== lobbyId);
        this._setState({ lobbies, loading: false });
        return null;
      }

      const lobbies = this._state.lobbies.map((l) => (l.id() === lobbyId ? updated : l));
      this._setState({ lobbies, loading: false });
      return updated;
    } catch (e) {
      const info = this._applyError(e);

      if (info.action === "not_found") {
        const lobbies = this._state.lobbies.filter((l) => l.id() !== lobbyId);
        this._setState({ lobbies });
      }

      return null;
    }
  }

  async getLobby({ lobbyId }) {
    this._setState({ loading: true });
    this._clearError();
    try {
      const lobby = await this._api.getLobby({ lobbyId });
      const exists = this._state.lobbies.some((l) => l.id() === lobbyId);
      const lobbies = exists
        ? this._state.lobbies.map((l) => (l.id() === lobbyId ? lobby : l))
        : [...this._state.lobbies, lobby];

      this._setState({ lobbies, loading: false });
      return lobby;
    } catch (e) {
      const info = this._applyError(e);

      if (info.action === "not_found") {
        const lobbies = this._state.lobbies.filter((l) => l.id() !== lobbyId);
        this._setState({ lobbies });
      }

      return null;
    }
  }

  async startGame({ lobbyId }) {
    this._setState({ loading: true });
    this._clearError();
    try {
      const updated = await this._api.startGame({ lobbyId });
      const lobbies = this._state.lobbies.map((l) => (l.id() === lobbyId ? updated : l));
      this._setState({ lobbies, loading: false });
      return updated;
    } catch (e) {
      this._applyError(e);
      return null;
    }
  }

  async endGame({ lobbyId }) {
    this._setState({ loading: true });
    this._clearError();
    try {
      const updated = await this._api.endGame({ lobbyId });
      const lobbies = this._state.lobbies.map((l) => (l.id() === lobbyId ? updated : l));
      this._setState({ lobbies, loading: false });
      return updated;
    } catch (e) {
      this._applyError(e);
      return null;
    }
  }

  async rematch({ lobbyId }) {
    this._setState({ loading: true });
    this._clearError();
    try {
      const updated = await this._api.rematch({ lobbyId });
      const lobbies = this._state.lobbies.map((l) => (l.id() === lobbyId ? updated : l));
      this._setState({ lobbies, loading: false });
      return updated;
    } catch (e) {
      this._applyError(e);
      return null;
    }
  }
}

export const lobbyStore = new LobbyStore();
