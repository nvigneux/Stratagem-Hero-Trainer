const CACHE_NAME = 'stratagem-hero-cache-fec1b638bab7f86e';

const ASSETS_TO_CACHE = [
  '/',
  '/loadout',
  '/assets/android-chrome-192x192.png',
  '/assets/android-chrome-512x512.png',
  '/assets/bmec_logo.svg',
  '/assets/dpad_icon.svg',
  '/assets/keypad_icon.svg',
  '/assets/logo_super_earth.svg',
  '/assets/readme/Stratagem-hero-1_1.webp',
  '/assets/readme/Stratagem-hero-2.webp',
  '/assets/readme/Stratagem-hero-3_1.webp',
  '/fonts/FS Sinclair Bold.woff2',
  '/fonts/FS Sinclair Medium.woff2',
  '/fonts/FS Sinclair Regular.woff2',
  '/icons/arrow.svg',
  '/icons/close.svg',
  '/icons/history.svg',
  '/icons/information.svg',
  '/icons/question-mark.svg',
  '/icons/settings.svg',
  '/icons/stratagems/Borderline Justice/Hover Pack.svg',
  '/icons/stratagems/Bridge/Grenadier Battlement.svg',
  '/icons/stratagems/Bridge/HMG Emplacement.svg',
  '/icons/stratagems/Bridge/Orbital EMS Strike.svg',
  '/icons/stratagems/Bridge/Orbital Gas Strike.svg',
  '/icons/stratagems/Bridge/Orbital Precision Strike.svg',
  '/icons/stratagems/Bridge/Orbital Smoke Strike.svg',
  '/icons/stratagems/Bridge/Shield Generator Relay.svg',
  '/icons/stratagems/Bridge/TD-110 Maelstrom.svg',
  '/icons/stratagems/Bridge/Tesla Tower.svg',
  '/icons/stratagems/Castellan’s Creed/40-K Meltagun.svg',
  '/icons/stratagems/Chemical Agents/Sterilizer.svg',
  '/icons/stratagems/Chemical Agents/“Guard Dog” Breath.svg',
  '/icons/stratagems/Control Group/Epoch.svg',
  '/icons/stratagems/Control Group/Laser Sentry.svg',
  '/icons/stratagems/Control Group/Warp Pack.svg',
  '/icons/stratagems/Dust Devils/Expendable Napalm.svg',
  '/icons/stratagems/Dust Devils/Solo Silo.svg',
  '/icons/stratagems/Dust Devils/Speargun.svg',
  '/icons/stratagems/Engineering Bay/Anti-Personnel Minefield.svg',
  '/icons/stratagems/Engineering Bay/Anti-Tank Mines.svg',
  '/icons/stratagems/Engineering Bay/Arc Thrower.svg',
  '/icons/stratagems/Engineering Bay/Ballistic Shield Backpack.svg',
  '/icons/stratagems/Engineering Bay/Gas Mines.svg',
  '/icons/stratagems/Engineering Bay/Grenade Launcher.svg',
  '/icons/stratagems/Engineering Bay/Incendiary Mines.svg',
  '/icons/stratagems/Engineering Bay/Laser Cannon.svg',
  '/icons/stratagems/Engineering Bay/Quasar Cannon.svg',
  '/icons/stratagems/Engineering Bay/Shield Generator Pack.svg',
  '/icons/stratagems/Engineering Bay/Supply Pack.svg',
  '/icons/stratagems/Engineering Bay/“Guard Dog” Rover.svg',
  '/icons/stratagems/Entrenched Division/Cremator.svg',
  '/icons/stratagems/Entrenched Division/Gas Mortar Sentry.svg',
  '/icons/stratagems/Exo Experts/Breakthrough Exosuit.svg',
  '/icons/stratagems/Exo Experts/Bullet Storm.svg',
  '/icons/stratagems/Exo Experts/Lumberer Exosuit.svg',
  '/icons/stratagems/Force of Law/GL-52 De-Escalator.svg',
  '/icons/stratagems/Force of Law/“Guard Dog” K-9.svg',
  '/icons/stratagems/General Stratagems/Call In Super Destroyer.svg',
  '/icons/stratagems/General Stratagems/Cargo Container.svg',
  '/icons/stratagems/General Stratagems/Dark Fluid Vessel.svg',
  '/icons/stratagems/General Stratagems/Hellbomb.svg',
  '/icons/stratagems/General Stratagems/Hive Breaker Drill.svg',
  '/icons/stratagems/General Stratagems/Orbital Illumination Flare.svg',
  '/icons/stratagems/General Stratagems/Prospecting Drill.svg',
  '/icons/stratagems/General Stratagems/Reinforce.svg',
  '/icons/stratagems/General Stratagems/Resupply.svg',
  '/icons/stratagems/General Stratagems/SEAF Artillery.svg',
  '/icons/stratagems/General Stratagems/SOS Beacon.svg',
  '/icons/stratagems/General Stratagems/Seismic Probe.svg',
  '/icons/stratagems/General Stratagems/Super Earth Flag.svg',
  '/icons/stratagems/General Stratagems/Tectonic Drill.svg',
  '/icons/stratagems/General Stratagems/Upload Data.svg',
  '/icons/stratagems/Hangar/Eagle 110MM Rocket Pods.svg',
  '/icons/stratagems/Hangar/Eagle 500KG Bomb.svg',
  '/icons/stratagems/Hangar/Eagle Airstrike.svg',
  '/icons/stratagems/Hangar/Eagle Cluster Bomb.svg',
  '/icons/stratagems/Hangar/Eagle Gas Strike.svg',
  '/icons/stratagems/Hangar/Eagle Napalm Airstrike.svg',
  '/icons/stratagems/Hangar/Eagle Rearm.svg',
  '/icons/stratagems/Hangar/Eagle Smoke Strike.svg',
  '/icons/stratagems/Hangar/Eagle Strafing Run.svg',
  '/icons/stratagems/Hangar/Fast Recon Vehicle.svg',
  '/icons/stratagems/Hangar/Incinerator FRV.svg',
  '/icons/stratagems/Hangar/Jump Pack.svg',
  '/icons/stratagems/Hangar/Supply FRV.svg',
  '/icons/stratagems/Masters of Ceremony/One True Flag.svg',
  '/icons/stratagems/Orbital Cannons/Orbital 120MM HE Barrage.svg',
  '/icons/stratagems/Orbital Cannons/Orbital 380MM HE Barrage.svg',
  '/icons/stratagems/Orbital Cannons/Orbital Airburst Strike.svg',
  '/icons/stratagems/Orbital Cannons/Orbital Gatling Barrage.svg',
  '/icons/stratagems/Orbital Cannons/Orbital Laser.svg',
  '/icons/stratagems/Orbital Cannons/Orbital Napalm Barrage.svg',
  '/icons/stratagems/Orbital Cannons/Orbital Railcannon Strike.svg',
  '/icons/stratagems/Orbital Cannons/Orbital Walking Barrage.svg',
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
  '/icons/stratagems/Python Commandos/Defoliation Tool.svg',
  '/icons/stratagems/Python Commandos/Guard Dog Hot Dog.svg',
  '/icons/stratagems/Python Commandos/Maxigun.svg',
  '/icons/stratagems/Redacted Regiment/C4 Pack.svg',
  '/icons/stratagems/Robotics Workshop/Autocannon Sentry.svg',
  '/icons/stratagems/Robotics Workshop/EMS Mortar Sentry.svg',
  '/icons/stratagems/Robotics Workshop/Emancipator Exosuit.svg',
  '/icons/stratagems/Robotics Workshop/Gatling Sentry.svg',
  '/icons/stratagems/Robotics Workshop/Machine Gun Sentry.svg',
  '/icons/stratagems/Robotics Workshop/Mortar Sentry.svg',
  '/icons/stratagems/Robotics Workshop/Patriot Exosuit.svg',
  '/icons/stratagems/Robotics Workshop/Rocket Sentry.svg',
  '/icons/stratagems/Robotics Workshop/“Guard Dog”.svg',
  '/icons/stratagems/Scope of Authority/AMW-20 Apex.svg',
  '/icons/stratagems/Scope of Authority/LAS-44 Nova.svg',
  '/icons/stratagems/Servants of Freedom/Hellbomb Portable.svg',
  '/icons/stratagems/Siege Breakers/Bastion MK XVI.svg',
  '/icons/stratagems/Siege Breakers/CQC-20.svg',
  '/icons/stratagems/Siege Breakers/EAT-411.svg',
  '/icons/stratagems/Siege Breakers/GL-28.svg',
  '/icons/stratagems/Urban Legends/Anti-Tank Emplacement.svg',
  '/icons/stratagems/Urban Legends/Directional Shield.svg',
  '/icons/stratagems/Urban Legends/Flame Sentry.svg',
  '/sounds/stratagem-code-error.mp3',
  '/sounds/stratagem-code-finish.mp3',
  '/sounds/stratagem-code-game-over.mp3',
  '/sounds/stratagem-code-new-round.mp3',
  '/sounds/stratagem-code-press-1.mp3',
  '/sounds/stratagem-code-press-2.mp3',
];

/* eslint-disable no-restricted-globals */
addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(ASSETS_TO_CACHE.map((url) => new Request(url, { cache: 'reload' })));
    // Cache the built JS/CSS referenced by both pages before installing this version.
    const chunks = new Set();
    const pages = await Promise.all(['/', '/loadout'].map(async (url) => {
      const response = await cache.match(url);
      return response.text();
    }));
    pages.forEach((html) => {
      // App Router also names page chunks inside streamed Flight data, without /_next/.
      const pattern = /static\/(?:chunks|css|media)\/[^"'\\\s<>]+?\.(?:js|css|woff2)/g;
      Array.from(html.matchAll(pattern)).forEach((match) => {
        chunks.add(`/_next/${match[0]}`);
      });
    });
    await cache.addAll([...chunks].map((url) => new Request(url, { cache: 'reload' })));
    await self.skipWaiting();
  })());
});

// cache business logic
addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET'
    || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // if the resource is found in the cache, return it
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(async (networkResponse) => {
            // clone the response to be able to return it and cache it
            if (!networkResponse.ok) return networkResponse;
            const responseToCache = networkResponse.clone();

            const cache = await caches.open(CACHE_NAME);
            await cache.put(event.request, responseToCache);

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
        .filter((cacheName) => cacheName.startsWith('stratagem-hero-cache-')
          && cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName)),
    )).then(() => self.clients.claim()),
  );
});
/* eslint-enable no-restricted-globals */
