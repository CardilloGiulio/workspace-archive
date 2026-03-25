"use client";

const KEY = "lupus.jwt";

class AuthStore {
  constructor() {
    this._listeners = new Set();
    this._token = null;
    this._identity = null;

    if (typeof window !== "undefined") {
      const t = window.localStorage.getItem(KEY);
      if (t) this._token = t;
      this._identity = this._token ? this._tryDecodeIdentity(this._token) : null;
    }
  }

  getToken() {
    return this._token;
  }

  getIdentity() {
    return this._identity;
  }

  isLoggedIn() {
    return !!this._token;
  }

  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  setToken(token) {
    this._token = token;
    this._identity = token ? this._tryDecodeIdentity(token) : null;

    if (typeof window !== "undefined") {
      if (token) window.localStorage.setItem(KEY, token);
      else window.localStorage.removeItem(KEY);
    }

    for (const l of this._listeners) l();
  }

  logout() {
    this.setToken(null);
  }

  _tryDecodeIdentity(token) {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    try {
      const payloadJson = _base64UrlToString(parts[1]);
      const payload = JSON.parse(payloadJson);

      const sub = typeof payload.sub === "string" ? payload.sub : null;
      const name = typeof payload.name === "string" ? payload.name : null;

      if (!sub || !name) return null;
      return { playerId: sub, playerName: name };
    } catch {
      return null;
    }
  }
}

function _base64UrlToString(base64url) {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4 === 0 ? "" : "=".repeat(4 - (base64.length % 4));
  return atob(base64 + pad);
}

export const authStore = new AuthStore();