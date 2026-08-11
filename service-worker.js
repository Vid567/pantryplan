const CACHE_NAME = "pantryplan-v1.5.0-beta.9";
const APP_SHELL = [
  "./",
  "./index.html",
  "./index-nl.html",
  "./index-en.html",
  "./pantryplan-app.html",
  "./pantryplan-localized.html",
  "./content-creator.html",
  "./PantryPlan-GUIDE.html",
  "./PantryPlan-GUIDE-NL.html",
  "./manifest.webmanifest",
  "./icon.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if(event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const sameOrigin = url.origin === self.location.origin;
  const isNavigation = event.request.mode === "navigate" || event.request.destination === "document";

  // HTML/navigation must prefer the current GitHub Pages version so a previously
  // installed PantryPlan service worker cannot keep serving an old landing page.
  if(sameOrigin && isNavigation){
    event.respondWith(
      fetch(event.request, { cache: "no-cache" })
        .then(response => {
          if(response.ok){
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then(cached => cached || caches.match("./index.html")))
    );
    return;
  }

  // Static assets remain cache-first for offline use.
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if(response.ok && sameOrigin){
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match("./pantryplan-app.html")))
  );
});
