// Nom et version du cache
const CACHE_NAME = 'stratagem-hero-cache-v1';

// Liste des ressources essentielles à mettre en cache
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/android-chrome-192x192.png',
  '/assets/android-chrome-512x512.png',
  '/assets/logo_super_earth.svg',
  '/assets/dpad_icon.svg',
  '/assets/keypad_icon.svg',
  '/assets/bmec_logo.svg',
  '/fonts/FS Sinclair Regular.woff2',
  '/fonts/FS Sinclair Medium.woff2',
  '/fonts/FS Sinclair Bold.woff2',
];

// Installation du service worker
/* eslint-disable no-restricted-globals */
addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch((error) => {
        console.error('Erreur lors de la mise en cache des ressources:', error);
      }),
  );
});

// Stratégie de cache pour les requêtes fetch
addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si la ressource est trouvée dans le cache, on la retourne
        if (response) {
          return response;
        }

        // Sinon, on fait la requête réseau
        return fetch(event.request)
          .then((networkResponse) => {
            // On ne met en cache que si c'est une requête GET
            if (event.request.method !== 'GET') {
              return networkResponse;
            }

            // On clone la réponse pour pouvoir à la fois la retourner et la mettre en cache
            const responseToCache = networkResponse.clone();

            // On met en cache la nouvelle ressource
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch(() => {
            // Si la requête réseau échoue et que c'est une requête pour une page, on retourne une page offline
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            // Pour les autres types de ressources (images, etc.), on ne peut rien faire
            return new Response('Ressource non disponible hors ligne', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' },
            });
          });
      }),
  );
});

// Activation et nettoyage des anciens caches
addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((cacheName) => cacheName !== CACHE_NAME) // On supprime les caches qui ne correspondent pas à la version actuelle
        .map((cacheName) => caches.delete(cacheName)),
    )),
  );
});
/* eslint-enable no-restricted-globals */
