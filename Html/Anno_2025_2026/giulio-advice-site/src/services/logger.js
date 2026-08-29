import { RUNTIME_CONFIG } from "../config/runtime.js";

const channelName = "giulio-advice-log-channel";
let channel = null;
let exitRecorded = false;

function safeId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getSessionId() {
  const key = "giulio-advice.session-id";
  try {
    let id = sessionStorage.getItem(key);
    if (!id) {
      id = safeId();
      sessionStorage.setItem(key, id);
    }
    return id;
  } catch {
    return `volatile-${safeId()}`;
  }
}

function sanitizeDetail(value, depth = 0) {
  if (depth > 4) return "[depth-limit]";
  if (value == null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
  if (value instanceof Error) return { name: value.name, message: value.message, stack: value.stack?.slice(0, 1600) };
  if (Array.isArray(value)) return value.slice(0, 30).map((entry) => sanitizeDetail(entry, depth + 1));
  if (typeof value === "object") {
    return Object.fromEntries(Object.entries(value).slice(0, 40).map(([key, entry]) => [key, sanitizeDetail(entry, depth + 1)]));
  }
  return String(value);
}

function readLogs() {
  try {
    const parsed = JSON.parse(localStorage.getItem(RUNTIME_CONFIG.logStorageKey) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLogs(logs) {
  try {
    localStorage.setItem(RUNTIME_CONFIG.logStorageKey, JSON.stringify(logs.slice(-RUNTIME_CONFIG.maxLogEntries)));
  } catch {
    try {
      localStorage.setItem(RUNTIME_CONFIG.logStorageKey, JSON.stringify(logs.slice(-250)));
    } catch {
      // Logging must never break the page.
    }
  }
}

export const logger = {
  init() {
    try { channel = new BroadcastChannel(channelName); } catch { channel = null; }
    this.log("page_entered", {
      title: document.title,
      referrer: document.referrer || null,
      viewport: { width: innerWidth, height: innerHeight }
    });

    window.addEventListener("error", (event) => {
      this.log("runtime_error", { message: event.message, file: event.filename, line: event.lineno, column: event.colno });
    });
    window.addEventListener("unhandledrejection", (event) => {
      this.log("unhandled_rejection", { reason: sanitizeDetail(event.reason) });
    });
    window.addEventListener("pagehide", () => this.recordExit("pagehide"));
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") this.log("page_hidden");
      else this.log("page_visible");
    });
  },

  log(type, detail = {}) {
    const entry = {
      id: safeId(),
      timestamp: new Date().toISOString(),
      type,
      path: location.pathname,
      sessionId: getSessionId(),
      detail: sanitizeDetail(detail)
    };
    const logs = readLogs();
    logs.push(entry);
    writeLogs(logs);
    window.dispatchEvent(new CustomEvent("giulio:log", { detail: entry }));
    try { channel?.postMessage(entry); } catch { /* no-op */ }
    return entry;
  },

  recordExit(reason = "unknown") {
    if (exitRecorded) return;
    exitRecorded = true;
    this.log("page_exited", { reason });
  },

  getLogs() { return readLogs(); },

  clear() {
    writeLogs([]);
    window.dispatchEvent(new CustomEvent("giulio:logs-cleared"));
    try { channel?.postMessage({ type: "__logs_cleared__" }); } catch { /* no-op */ }
  },

  subscribe(callback) {
    const localHandler = (event) => callback(event.detail);
    const clearHandler = () => callback({ type: "__logs_cleared__" });
    window.addEventListener("giulio:log", localHandler);
    window.addEventListener("giulio:logs-cleared", clearHandler);
    const messageHandler = (event) => callback(event.data);
    try { channel?.addEventListener("message", messageHandler); } catch { /* no-op */ }
    return () => {
      window.removeEventListener("giulio:log", localHandler);
      window.removeEventListener("giulio:logs-cleared", clearHandler);
      try { channel?.removeEventListener("message", messageHandler); } catch { /* no-op */ }
    };
  }
};
