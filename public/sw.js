const CACHE_NAME = 'stratagem-hero-cache-v1';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/android-chrome-192x192.png',
  '/assets/android-chrome-512x512.png',

  // Super Earth logo
  '/assets/logo_super_earth.svg',

  // D-pad icon
  '/assets/dpad_icon.svg',

  // Keypad icon
  '/assets/keypad_icon.svg',

  // BMEC logo
  '/assets/bmec_logo.svg',

  // Interface icons
  '/icons/arrow.svg',
  '/icons/close.svg',
  '/icons/history.svg',
  '/icons/settings.svg',
  '/icons/question-mark.svg',

  // Sounds
  '/sounds/stratagem-code-error.mp3',
  '/sounds/stratagem-code-finish.mp3',
  '/sounds/stratagem-code-game-over.mp3',
  '/sounds/stratagem-code-new-round.mp3',
  '/sounds/stratagem-code-press-1.mp3',
  '/sounds/stratagem-code-press-2.mp3',

  // Fonts
  '/fonts/FS Sinclair Regular.woff2',
  '/fonts/FS Sinclair Medium.woff2',
  '/fonts/FS Sinclair Bold.woff2',

  // Stratagem icons
  // Borderline Justice icons
  '/icons/stratagems/Borderline Justice/Hover Pack.svg',

  // Bridge icons
  '/icons/stratagems/Bridge/HMG Emplacement.svg',
  '/icons/stratagems/Bridge/Orbital EMS Strike.svg',
  '/icons/stratagems/Bridge/Orbital Gas Strike.svg',
  '/icons/stratagems/Bridge/Orbital Precision Strike.svg',
  '/icons/stratagems/Bridge/Orbital Smoke Strike.svg',
  '/icons/stratagems/Bridge/Shield Generator Relay.svg',
  '/icons/stratagems/Bridge/Tesla Tower.svg',

  // Chemical Agents icons
  '/icons/stratagems/Chemical Agents/Guard Dog Breath.svg',
  '/icons/stratagems/Chemical Agents/Sterilizer.svg',

  // Engineering Bay icons
  '/icons/stratagems/Engineering Bay/Anti-Personnel Minefield.svg',
  '/icons/stratagems/Engineering Bay/Arc Thrower.svg',
  '/icons/stratagems/Engineering Bay/Ballistic Shield Backpack.svg',
  '/icons/stratagems/Engineering Bay/Gas Mines.svg',
  '/icons/stratagems/Engineering Bay/Grenade Launcher.svg',
  '/icons/stratagems/Engineering Bay/"Guard Dog" Rover.svg',
  '/icons/stratagems/Engineering Bay/Incendiary Mines.svg',
  '/icons/stratagems/Engineering Bay/Laser Cannon.svg',
  '/icons/stratagems/Engineering Bay/Quasar Cannon.svg',
  '/icons/stratagems/Engineering Bay/Shield Generator Pack.svg',
  '/icons/stratagems/Engineering Bay/Supply Pack.svg',

  // General Stratagems icons
  '/icons/stratagems/General Stratagems/Dark Fluid Vessel.svg',
  '/icons/stratagems/General Stratagems/Hellbomb.svg',
  '/icons/stratagems/General Stratagems/Hive Breaker Drill.svg',
  '/icons/stratagems/General Stratagems/Orbital Illumination Flare.svg',
  '/icons/stratagems/General Stratagems/Prospecting Drill.svg',
  '/icons/stratagems/General Stratagems/Reinforce.svg',
  '/icons/stratagems/General Stratagems/Resupply.svg',
  '/icons/stratagems/General Stratagems/SEAF Artillery.svg',
  '/icons/stratagems/General Stratagems/Seismic Probe.svg',
  '/icons/stratagems/General Stratagems/SOS Beacon.svg',
  '/icons/stratagems/General Stratagems/Super Earth Flag.svg',
  '/icons/stratagems/General Stratagems/Tectonic Drill.svg',
  '/icons/stratagems/General Stratagems/Upload Data.svg',

  // Hangar icons
  '/icons/stratagems/Hangar/Eagle 110MM Rocket Pods.svg',
  '/icons/stratagems/Hangar/Eagle 500KG Bomb.svg',
  '/icons/stratagems/Hangar/Eagle Airstrike.svg',
  '/icons/stratagems/Hangar/Eagle Cluster Bomb.svg',
  '/icons/stratagems/Hangar/Eagle Napalm Airstrike.svg',
  '/icons/stratagems/Hangar/Eagle Rearm.svg',
  '/icons/stratagems/Hangar/Eagle Smoke Strike.svg',
  '/icons/stratagems/Hangar/Eagle Strafing Run.svg',
  '/icons/stratagems/Hangar/Fast Recon Vehicle.svg',
  '/icons/stratagems/Hangar/Jump Pack.svg',

  // Orbital Cannons icons
  '/icons/stratagems/Orbital Cannons/Orbital 120MM HE Barrage.svg',
  '/icons/stratagems/Orbital Cannons/Orbital 380MM HE Barrage.svg',
  '/icons/stratagems/Orbital Cannons/Orbital Airburst Strike.svg',
  '/icons/stratagems/Orbital Cannons/Orbital Gatling Barrage.svg',
  '/icons/stratagems/Orbital Cannons/Orbital Laser.svg',
  '/icons/stratagems/Orbital Cannons/Orbital Napalm Barrage.svg',
  '/icons/stratagems/Orbital Cannons/Orbital Railcannon Strike.svg',
  '/icons/stratagems/Orbital Cannons/Orbital Walking Barrage.svg',

  // Patriotic Administration Center icons
  '/icons/stratagems/Patriotic Administration Center/Airburst Rocket Launcher.svg',
  '/icons/stratagems/Patriotic Administration Center/Anti-Materiel Rifle.svg',
  '/icons/stratagems/Patriotic Administration Center/Autocannon.svg',
  '/icons/stratagems/Patriotic Administration Center/Commando.svg',
  '/icons/stratagems/Patriotic Administration Center/Expendable Anti-Tank.svg',
  '/icons/stratagems/Patriotic Administration Center/Flamethrower.svg',
  '/icons/stratagems/Patriotic Administration Center/Heavy Machine Gun.svg',
  '/icons/stratagems/Patriotic Administration Center/Machine Gun.svg',
  '/icons/stratagems/Patriotic Administration Center/Railgun.svg',
  '/icons/stratagems/Patriotic Administration Center/Recoilless Rifle.svg',
  '/icons/stratagems/Patriotic Administration Center/Spear.svg',
  '/icons/stratagems/Patriotic Administration Center/StA-X3 W.A.S.P. Launcher.svg',
  '/icons/stratagems/Patriotic Administration Center/Stalwart.svg',

  // Robotics Workshop icons
  '/icons/stratagems/Robotics Workshop/Autocannon Sentry.svg',
  '/icons/stratagems/Robotics Workshop/Emancipator Exosuit.svg',
  '/icons/stratagems/Robotics Workshop/EMS Mortar Sentry.svg',
  '/icons/stratagems/Robotics Workshop/Gatling Sentry.svg',
  '/icons/stratagems/Robotics Workshop/"Guard Dog".svg',
  '/icons/stratagems/Robotics Workshop/Machine Gun Sentry.svg',
  '/icons/stratagems/Robotics Workshop/Mortar Sentry.svg',
  '/icons/stratagems/Robotics Workshop/Patriot Exosuit.svg',
  '/icons/stratagems/Robotics Workshop/Rocket Sentry.svg',

  // Servants of Freedom icons
  '/icons/stratagems/Servants of Freedom/Hellbomb Portable.svg',

  // Urban Legends icons
  '/icons/stratagems/Urban Legends/Anti-Tank Emplacement.svg',
  '/icons/stratagems/Urban Legends/Directional Shield.svg',
  '/icons/stratagems/Urban Legends/Flame Sentry.svg',

  // Force of Law icons
  '/icons/stratagems/Force of Law/GL-52 De-Escalator.svg',
  '/icons/stratagems/Force of Law/“Guard Dog” K-9.svg',
];

/* eslint-disable no-restricted-globals */
addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .catch((error) => {
        console.error('Error caching assets:', error);
      }),
  );
});

// cache business logic
addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // if the resource is found in the cache, return it
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then((networkResponse) => {
            // if the request is not a GET, return the network response
            if (event.request.method !== 'GET') {
              return networkResponse;
            }

            // clone the response to be able to return it and cache it
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch(() => {
            // if the network request fails and the request is for a page, return the offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }

            return new Response('Resource not available offline', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' },
            });
          });
      }),
  );
});

// activate and clean up old caches
addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((cacheName) => cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName)),
    )),
  );
});
/* eslint-enable no-restricted-globals */
