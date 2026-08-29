import { logger } from "./logger.js";
import { settings } from "./settings.js";
import { RUNTIME_CONFIG } from "../config/runtime.js";

const failed = new Set();
let currentMusic = null;

function markFailure(src, role, error) {
  const key = `${role}:${src}`;
  if (failed.has(key)) return;
  failed.add(key);
  logger.log("asset_failed", { assetType: "audio", src, role, message: error?.message ?? "Audio unavailable", fallback: "silent" });
}

function createAudio(src, { loop = false, role = "effect" } = {}) {
  const audio = new Audio();
  audio.preload = "metadata";
  audio.loop = loop;
  audio.src = src;
  audio.volume = settings.getValue("volume");
  audio.addEventListener("error", () => markFailure(src, role, new Error("Browser could not load audio")), { once: true });
  return audio;
}

async function play(audio, src, role) {
  let timer;
  try {
    timer = setTimeout(() => markFailure(src, role, new Error("Audio load timeout")), RUNTIME_CONFIG.audioTimeoutMs);
    await audio.play();
    logger.log("audio_played", { src, role });
    return true;
  } catch (error) {
    markFailure(src, role, error);
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export const audioManager = {
  async playMusic(src) {
    if (!settings.getValue("musicEnabled") || !src || failed.has(`music:${src}`)) return false;
    if (currentMusic?.dataset.src === src && !currentMusic.paused) return true;
    this.stopMusic();
    currentMusic = createAudio(src, { loop: true, role: "music" });
    currentMusic.dataset.src = src;
    currentMusic.volume = settings.getValue("volume") * 0.62;
    return play(currentMusic, src, "music");
  },
  stopMusic() {
    if (!currentMusic) return;
    currentMusic.pause();
    currentMusic.currentTime = 0;
    currentMusic = null;
    logger.log("music_stopped");
  },
  async playEffect(src) {
    if (!settings.getValue("effectsEnabled") || !src || failed.has(`effect:${src}`)) return false;
    return play(createAudio(src, { role: "effect" }), src, "effect");
  },
  async playVoice(src) {
    if (!settings.getValue("voiceEnabled") || !src || failed.has(`voice:${src}`)) return false;
    return play(createAudio(src, { role: "voice" }), src, "voice");
  },
  updateVolume() {
    if (currentMusic) currentMusic.volume = settings.getValue("volume") * 0.62;
  }
};

window.addEventListener("giulio:settings", () => audioManager.updateVolume());
