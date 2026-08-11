// PantryPlan Browser Beta: service worker intentionally disabled.
// Reason: testers must always receive the current GitHub Pages version.
// This cleanup worker removes older PantryPlan caches and unregisters itself.

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.toLowerCase().includes('pantryplan')).map(key => caches.delete(key)));
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    await self.registration.unregister();
    for (const client of clients) {
      try {
        const url = new URL(client.url);
        url.searchParams.set('_pp_refresh', Date.now().toString());
        client.navigate(url.href);
      } catch (e) {}
    }
  })());
});

self.addEventListener('fetch', () => {
  // No fetch interception: always use the network/browser cache normally.
});
