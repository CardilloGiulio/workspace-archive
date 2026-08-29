import { RUNTIME_CONFIG } from "../config/runtime.js";

export function createServiceCollector(logger) {
  const queue = [];
  let timer = null;
  let flushing = false;

  async function flush() {
    if (!RUNTIME_CONFIG.collectorEndpoint || flushing || queue.length === 0) return;
    flushing = true;
    const batch = queue.splice(0, RUNTIME_CONFIG.collectorBatchSize);
    try {
      const response = await fetch(RUNTIME_CONFIG.collectorEndpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ events: batch }),
        keepalive: true
      });
      if (!response.ok) throw new Error(`Collector HTTP ${response.status}`);
    } catch (error) {
      queue.unshift(...batch);
      console.warn("Collector unavailable; logs remain local.", error);
    } finally {
      flushing = false;
    }
  }

  function enqueue(entry) {
    if (!RUNTIME_CONFIG.collectorEndpoint || entry.type.startsWith("collector_")) return;
    queue.push(entry);
    clearTimeout(timer);
    timer = setTimeout(flush, 1200);
  }

  const unsubscribe = logger.subscribe((entry) => {
    if (entry?.type && !entry.type.startsWith("__")) enqueue(entry);
  });

  window.addEventListener("pagehide", flush);
  return { flush, destroy: unsubscribe, queue };
}
