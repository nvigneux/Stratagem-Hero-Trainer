/* eslint-env node */
const { spawn } = require('node:child_process');
const { mkdtemp, rm } = require('node:fs/promises');
const { tmpdir } = require('node:os');
const { join } = require('node:path');

/**
 * Cypress's injected resources cannot reload offline. Run this scenario in an isolated
 * Chrome target, keeping assertions in the spec and browser lifecycle in Node support.
 * @returns {object} Tasks and browser executable configuration.
 */
function createOfflineBrowserTasks() {
  let executable;
  let browser;
  let profile;
  let socket;
  let sessionId;
  let sequence = 0;
  const requests = new Map();

  const send = (method, params, targetSession) => new Promise((resolve, reject) => {
    sequence += 1;
    const id = sequence;
    const timer = setTimeout(() => {
      requests.delete(id);
      reject(Error(`Chrome command timed out: ${method}`));
    }, 30000);
    requests.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({
      id, method, params, sessionId: targetSession,
    }));
  });
  const command = (method, params = {}) => send(method, params, sessionId);
  const evaluate = async (expression) => {
    const result = await command('Runtime.evaluate', {
      expression, awaitPromise: true, returnByValue: true,
    });
    if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails));
    return result.result.value ?? null;
  };
  const waitFor = async (expression) => {
    const deadline = Date.now() + 30000;
    while (Date.now() < deadline) {
      // Browser state, rather than animation timings, determines when to continue.
      // eslint-disable-next-line no-await-in-loop
      if (await evaluate(expression)) return null;
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => { setTimeout(resolve, 100); });
    }
    throw Error(`Browser condition timed out: ${expression}`);
  };
  const reload = async () => {
    const loaded = new Promise((resolve, reject) => {
      let timer;
      const onMessage = ({ data }) => {
        const event = JSON.parse(data);
        if (event.method === 'Page.loadEventFired' && event.sessionId === sessionId) {
          clearTimeout(timer);
          socket.removeEventListener('message', onMessage);
          resolve();
        }
      };
      timer = setTimeout(() => {
        socket.removeEventListener('message', onMessage);
        reject(Error('Offline reload timed out'));
      }, 30000);
      socket.addEventListener('message', onMessage);
    });
    await command('Page.reload');
    await loaded;
    return null;
  };
  const close = async () => {
    requests.forEach(({ timer, reject }) => {
      clearTimeout(timer);
      reject(Error('Offline browser closed'));
    });
    requests.clear();
    if (socket) socket.close();
    if (browser && browser.exitCode === null && browser.signalCode === null) {
      await new Promise((resolve) => {
        browser.once('close', resolve);
        browser.kill();
      });
    }
    if (profile) {
      await rm(profile, {
        recursive: true, force: true, maxRetries: 10, retryDelay: 100,
      });
    }
    socket = null;
    browser = null;
    profile = null;
    return null;
  };
  const open = async (url) => {
    await close();
    if (!executable) throw Error('Run the offline spec with --browser chrome');
    profile = await mkdtemp(join(tmpdir(), 'stratagem-offline-'));
    browser = spawn(executable, [
      '--headless=new', '--no-sandbox', '--disable-gpu', '--remote-debugging-port=0',
      `--user-data-dir=${profile}`, 'about:blank',
    ], { stdio: ['ignore', 'ignore', 'pipe'] });
    try {
      const endpoint = await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(Error('Chrome startup timed out')), 20000);
        browser.once('error', (error) => { clearTimeout(timer); reject(error); });
        browser.stderr.on('data', (chunk) => {
          const match = chunk.toString().match(/DevTools listening on (ws:\/\/\S+)/);
          if (match) { clearTimeout(timer); resolve(match[1]); }
        });
      });
      socket = new WebSocket(endpoint);
      await new Promise((resolve, reject) => {
        socket.addEventListener('open', resolve, { once: true });
        socket.addEventListener('error', reject, { once: true });
      });
      socket.addEventListener('message', ({ data }) => {
        const message = JSON.parse(data);
        const pending = requests.get(message.id);
        if (!pending) return;
        requests.delete(message.id);
        clearTimeout(pending.timer);
        if (message.error) pending.reject(Error(JSON.stringify(message.error)));
        else pending.resolve(message.result);
      });
      const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
      const target = await send('Target.attachToTarget', { targetId, flatten: true });
      sessionId = target.sessionId;
      await command('Page.enable');
      await command('Network.enable');
      await command('Emulation.setDeviceMetricsOverride', {
        width: 1440, height: 900, deviceScaleFactor: 1, mobile: false,
      });
      await command('Page.navigate', { url });
      return null;
    } catch (error) {
      await close();
      throw error;
    }
  };

  return {
    setExecutable: (value) => { executable = value; },
    tasks: {
      openOfflineBrowser: open,
      closeOfflineBrowser: close,
      evaluateOfflineBrowser: evaluate,
      waitForOfflineBrowser: waitFor,
      reloadOfflineBrowser: reload,
      commandOfflineBrowser: async ({ method, params }) => {
        await command(method, params);
        return null;
      },
    },
  };
}

module.exports = { createOfflineBrowserTasks };
