import { RUNTIME_CONFIG } from "../config/runtime.js";
import { logger } from "./logger.js";

const defaults = Object.freeze({
  reducedMotion: globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false,
  musicEnabled: true,
  voiceEnabled: true,
  effectsEnabled: true,
  volume: 0.55
});

function read() {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(RUNTIME_CONFIG.settingsStorageKey) || "{}") };
  } catch {
    return { ...defaults };
  }
}

let state = read();

export const settings = {
  get() { return { ...state }; },
  getValue(key) { return state[key]; },
  update(patch) {
    state = { ...state, ...patch };
    try { localStorage.setItem(RUNTIME_CONFIG.settingsStorageKey, JSON.stringify(state)); }
    catch { /* Settings remain available for the current page. */ }
    document.documentElement.dataset.reducedMotion = state.reducedMotion ? "true" : "false";
    window.dispatchEvent(new CustomEvent("giulio:settings", { detail: this.get() }));
    logger.log("settings_changed", patch);
  },
  init() {
    document.documentElement.dataset.reducedMotion = state.reducedMotion ? "true" : "false";
  }
};
