/* global importScripts */
/* eslint-disable no-restricted-globals */
// This manifest is generated from the finished production build.
importScripts('/offline-assets.js');
const CACHE_NAME = `stratagem-hero-cache-${self.OFFLINE_BUILD}`;

addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Reject installation if any required file is missing.
    await cache.addAll(self.OFFLINE_ASSETS.map((url) => new Request(url, { cache: 'reload' })));
  })());
});

addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin
    || event.request.headers.get('RSC') === '1') return;
  // Only the trainer and its build resources belong to this offline cache.
  if (event.request.mode === 'navigate' && url.pathname !== '/') return;
  const key = event.request.mode === 'navigate' ? '/' : event.request;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(key);
    return cached || fetch(event.request);
  })());
});

addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith('stratagem-hero-cache-')
      && name !== CACHE_NAME).map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});
/* eslint-enable no-restricted-globals */
