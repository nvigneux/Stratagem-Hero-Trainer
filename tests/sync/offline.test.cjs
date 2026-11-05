const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('Worker precaches real assets, serves icons offline, and isolates cache cleanup', async () => {
  const events = {};
  const stored = new Map();
  const deleted = [];
  let fail = false;
  const cache = {
    async addAll(urls) {
      urls.forEach((request) => {
        assert.equal(request.cache, 'reload');
        const { url } = request;
        if (url !== '/' && url !== '/loadout' && !url.startsWith('/_next/')) {
          assert.ok(fs.existsSync(path.join(__dirname, '../../public', url)), url);
        }
        stored.set(url, { cached: url, text: async () => '<script src="/_next/static/chunks/chunk.js"></script> static/chunks/app/game.js' });
      });
    },
    async match(url) { return stored.get(url); },
    async put(url, value) { stored.set(url, value); },
  };
  const context = {
    URL, Response, console,
    Request: class {
      constructor(url, options) { this.url = url; this.cache = options.cache; }
    },
    self: {
      location: { origin: 'https://trainer.test' },
      skipWaiting: async () => {}, clients: { claim: async () => {} },
    },
    addEventListener: (name, handler) => { events[name] = handler; },
    caches: {
      open: async () => cache,
      match: async (request) => stored.get(typeof request === 'string' ? request : request.url),
      keys: async () => ['unrelated-app', 'stratagem-hero-cache-old'],
      delete: async (name) => { deleted.push(name); },
    },
    fetch: async () => { if (fail) throw Error('offline'); return { ok: true }; },
  };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../../public/sw.js'), 'utf8'), context);
  let pending;
  events.install({ waitUntil: (promise) => { pending = promise; } });
  await pending;
  assert.ok(stored.has('/_next/static/chunks/chunk.js'));
  assert.ok(stored.has('/_next/static/chunks/app/game.js'));
  assert.ok(stored.has('/icons/stratagems/Bridge/HMG Emplacement.svg'));
  fail = true;
  let result;
  // Absolute request URL, matching browser behavior.
  const icon = '/icons/stratagems/Bridge/HMG Emplacement.svg';
  stored.set('https://trainer.test' + icon, stored.get(icon));
  events.fetch({
    request: { method: 'GET', url: 'https://trainer.test' + icon },
    respondWith: (promise) => { result = promise; },
  });
  assert.equal((await result).cached, icon);
  events.fetch({
    request: { method: 'GET', mode: 'navigate', url: 'https://trainer.test/other' },
    respondWith: (promise) => { result = promise; },
  });
  assert.equal((await result).cached, '/');
  events.activate({ waitUntil: (promise) => { pending = promise; } });
  await pending;
  assert.deepEqual(deleted, ['stratagem-hero-cache-old']);
  events.fetch({ request: { method: 'POST' }, respondWith: () => assert.fail('POST intercepted') });
});
