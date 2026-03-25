const DEFAULT_BASE_URL = "http://127.0.0.1:8000";

export class AuthApi {
  constructor({ baseUrl = DEFAULT_BASE_URL } = {}) {
    this._baseUrl = baseUrl.replace(/\/+$/, "");
  }

  async token({ playerId, playerName, secret }) {
    const res = await fetch(`${this._baseUrl}/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        player_id: playerId,
        player_name: playerName,
        secret,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${res.statusText} ${text}`.trim());
    }

    return res.json(); // { access_token, token_type }
  }
}