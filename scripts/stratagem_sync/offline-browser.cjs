/* Standalone Chrome offline reload check: no Cypress proxy or additional dependencies. */
const { spawn } = require('node:child_process');
const { mkdtempSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const assert = require('node:assert/strict');

const url = process.env.TEST_URL || 'http://localhost:3000';
const profile = mkdtempSync(join(tmpdir(), 'stratagem-offline-'));
const executable = process.env.CHROME_BIN || (process.platform === 'darwin'
  ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : 'google-chrome');
const browser = spawn(executable, [
  '--headless=new', '--no-sandbox', '--disable-gpu', '--remote-debugging-port=0',
  `--user-data-dir=${profile}`, 'about:blank',
], { stdio: ['ignore', 'ignore', 'pipe'] });

async function main() {
  const endpoint = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(Error('Chrome startup timeout')), 20000);
    browser.on('error', reject);
    browser.stderr.on('data', (chunk) => {
      const match = chunk.toString().match(/DevTools listening on (ws:\/\/\S+)/);
      if (match) { clearTimeout(timer); resolve(match[1]); }
    });
  });
  const socket = new WebSocket(endpoint);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  let sequence = 0;
  const diagnostics = [];
  const requests = new Map();
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (message.method === 'Runtime.exceptionThrown') diagnostics.push(message.params);
    if (message.method === 'Network.loadingFailed' && !message.params.canceled) {
      diagnostics.push(message.params);
    }
    const pending = requests.get(message.id);
    if (!pending) return;
    requests.delete(message.id);
    clearTimeout(pending.timer);
    if (message.error) pending.reject(Error(JSON.stringify(message.error)));
    else pending.resolve(message.result);
  });
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => { requests.delete(id); reject(Error(`Timeout: ${method}`)); }, 45000);
    requests.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const call = (method, params) => send(method, params, sessionId);
  const evaluate = async (expression) => {
    const result = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const waitFor = async (expression) => {
    const deadline = Date.now() + 30000;
    while (Date.now() < deadline) {
      if (await evaluate(expression)) return;
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    throw Error(`Browser assertion timed out: ${expression}`);
  };
  try {
    await call('Page.enable');
    await call('Network.enable');
    await call('Runtime.enable');
    await call('Emulation.setDeviceMetricsOverride', {
      width: 1440, height: 900, deviceScaleFactor: 1, mobile: false,
    });
    await call('Page.navigate', { url });
    await waitFor('Boolean(document.querySelector(".container-is-opened"))');
    await evaluate('navigator.serviceWorker.ready.then(() => true)');
    await waitFor('Boolean(navigator.serviceWorker.controller)');
    await call('Network.emulateNetworkConditions', {
      offline: true, latency: 0, downloadThroughput: -1, uploadThroughput: -1,
    });
    // Disable HTTP cache while allowing the worker to handle a normal reload.
    await call('Network.setCacheDisabled', { cacheDisabled: true });
    const reloaded = new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(Error('Offline reload did not finish')), 30000);
      const onLoad = ({ data }) => {
        const event = JSON.parse(data);
        if (event.method === 'Page.loadEventFired' && event.sessionId === sessionId) {
          clearTimeout(timer);
          socket.removeEventListener('message', onLoad);
          resolve();
        }
      };
      socket.addEventListener('message', onLoad);
    });
    await call('Page.reload');
    await reloaded;
    try {
      await waitFor('Boolean(document.querySelector(".container-is-opened"))');
    } catch (error) {
      console.error(await evaluate('JSON.stringify({title:document.title,location:location.href,ready:document.readyState,html:document.documentElement.outerHTML.slice(0,1600),scripts:[...document.scripts].map(s=>s.src),controlled:Boolean(navigator.serviceWorker.controller)})'));
      console.error(diagnostics);
      throw error;
    }
    assert.equal(await evaluate('navigator.onLine'), false);
    assert.equal(await evaluate(`fetch('/icons/stratagems/Bridge/HMG%20Emplacement.svg')
      .then(async response => response.ok && (await response.text()).includes('<svg'))`), true);
    assert.equal(await evaluate("fetch('/manifest.json').then(response => response.ok)"), true);
    console.log('PASS: Chrome reloaded and hydrated the game offline; SVG available offline.');
  } finally {
    socket.close();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => {
  browser.kill();
  browser.on('close', () => {
    // Chrome's child processes may finish writing shortly after the parent exits.
    try {
      rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
    } catch (error) {
      console.warn(`Temporary browser profile retained (${error.code}): ${profile}`);
    }
  });
});
