import { Lobby } from "../domain/Lobby";
import { ApiError } from "./apiError";

const DEFAULT_BASE_URL = "http://127.0.0.1:8000";

export class LobbyApi {
  constructor({ baseUrl = DEFAULT_BASE_URL, getToken = () => null } = {}) {
    this._baseUrl = baseUrl.replace(/\/+$/, "");
    this._getToken = getToken;
  }

  async listLobbies() {
    const data = await this._requestJson("/lobbies/");
    return data.map((x) => new Lobby(x));
  }

  async createLobby({ lobbyId, name }) {
    const data = await this._requestJson("/lobbies/", {
      method: "POST",
      body: { lobby_id: lobbyId, name },
    });
    return new Lobby(data);
  }

  async joinLobby({ lobbyId }) {
    const data = await this._requestJson(`/lobbies/${encodeURIComponent(lobbyId)}/join`, {
      method: "POST",
      body: {},
    });
    return new Lobby(data);
  }

  async leaveLobby({ lobbyId }) {
    try {
      const data = await this._requestJson(`/lobbies/${encodeURIComponent(lobbyId)}/leave`, {
        method: "POST",
        body: {},
      });
      return new Lobby(data);
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) return null;
      throw e;
    }
  }

  async startGame({ lobbyId }) {
    const data = await this._requestJson(`/lobbies/${encodeURIComponent(lobbyId)}/start`, {
      method: "POST",
      body: {},
    });
    return new Lobby(data);
  }

  async endGame({ lobbyId }) {
    const data = await this._requestJson(`/lobbies/${encodeURIComponent(lobbyId)}/end`, {
      method: "POST",
      body: {},
    });
    return new Lobby(data);
  }

  async rematch({ lobbyId }) {
    const data = await this._requestJson(`/lobbies/${encodeURIComponent(lobbyId)}/rematch`, {
      method: "POST",
      body: {},
    });
    return new Lobby(data);
  }

  async getLobby({ lobbyId }) {
    const data = await this._requestJson(`/lobbies/${encodeURIComponent(lobbyId)}`, {
      method: "GET",
    });
    return new Lobby(data);
  }

  async _requestJson(path, { method = "GET", body } = {}) {
    const token = this._getToken ? this._getToken() : null;

    const res = await fetch(`${this._baseUrl}${path}`, {
      method,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      let detail = "";
      try {
        const j = await res.json();
        detail = typeof j?.detail === "string" ? j.detail : JSON.stringify(j);
      } catch {
        detail = await res.text().catch(() => "");
      }
      throw new ApiError(res.status, detail.trim());
    }

    return res.json();
  }
}