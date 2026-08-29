const ASSET_CACHE = "giulio-advice-assets-v3";
const CACHE_PREFIX = "giulio-advice-assets-";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((key) => key.startsWith(CACHE_PREFIX) && key !== ASSET_CACHE)
      .map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith("/assets-optimized/")) return;

  event.respondWith((async () => {
    const cache = await caches.open(ASSET_CACHE);
    const cached = await cache.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch (error) {
      return cached || Response.error();
    }
  })());
});
