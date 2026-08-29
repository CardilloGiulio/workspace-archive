import { logger } from "./logger.js";

export async function initAssetCache() {
  if (!("serviceWorker" in navigator)) {
    logger.log("asset_cache_unavailable", { reason: "service-worker-unsupported" });
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
    logger.log("asset_cache_ready", { scope: registration.scope });
    return true;
  } catch (error) {
    logger.log("asset_cache_failed", { message: error.message });
    return false;
  }
}
