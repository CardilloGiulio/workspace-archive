import { RUNTIME_CONFIG } from "../config/runtime.js";
import { logger } from "./logger.js";

const recordedFailures = new Set();
const warmedAssets = new Set();

function timeoutPromise(ms, message) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));
}

export async function loadImage(img, src, metadata = {}) {
  if (!img || !src) return false;

  img.dataset.assetState = "loading";
  img.decoding = "async";
  img.loading = "eager";
  if (metadata.priority) img.fetchPriority = metadata.priority;

  const load = new Promise((resolve, reject) => {
    const onLoad = () => { cleanup(); resolve(true); };
    const onError = () => { cleanup(); reject(new Error(`Image failed: ${src}`)); };
    const cleanup = () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
    img.addEventListener("load", onLoad, { once: true });
    img.addEventListener("error", onError, { once: true });
    img.src = src;
    if (img.complete && img.naturalWidth > 0) onLoad();
  });

  try {
    await Promise.race([load, timeoutPromise(RUNTIME_CONFIG.assetTimeoutMs, `Image timeout: ${src}`)]);
    try { await img.decode?.(); } catch { /* The image is already usable after load. */ }
    img.dataset.assetState = "ready";
    warmedAssets.add(src);
    logger.log("asset_loaded", {
      assetType: "image",
      src,
      cached: metadata.preload ? warmedAssets.has(src) : undefined,
      ...metadata,
      dimensions: { width: img.naturalWidth, height: img.naturalHeight }
    });
    return true;
  } catch (error) {
    img.dataset.assetState = "failed";
    img.hidden = true;
    img.closest(".asset-host")?.classList.add("asset-host--fallback");
    const key = `${location.pathname}:${src}`;
    if (!recordedFailures.has(key)) {
      recordedFailures.add(key);
      logger.log("asset_failed", {
        assetType: "image",
        src,
        ...metadata,
        message: error.message,
        fallback: metadata.fallback ?? "css-placeholder"
      });
    }
    return false;
  }
}

export function createImage({ src, alt = "", className = "", id = "", metadata = {} }) {
  const img = new Image();
  img.alt = alt;
  img.className = className;
  if (id) img.id = id;
  loadImage(img, src, metadata);
  return img;
}

export async function preloadImages(definitions = [], { concurrency = 4 } = {}) {
  const queue = [];
  const seen = new Set();

  for (const definition of definitions) {
    if (!definition?.src || seen.has(definition.src) || warmedAssets.has(definition.src)) continue;
    seen.add(definition.src);
    queue.push(definition);
  }

  let cursor = 0;
  const workers = Array.from({ length: Math.min(Math.max(1, concurrency), queue.length) }, async () => {
    while (cursor < queue.length) {
      const definition = queue[cursor++];
      const { src, ...metadata } = definition;
      const img = new Image();
      await loadImage(img, src, { ...metadata, preload: true, priority: "low" });
    }
  });

  await Promise.all(workers);
}
