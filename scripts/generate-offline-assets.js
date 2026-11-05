/* eslint-env node */
// Run after Next builds so every lazy chunk (including audio) is available offline.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

/**
 * List build inputs recursively, excluding hidden files.
 * @param {string} directory - Directory to scan.
 * @returns {string[]} Files to precache.
 */
function files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('.')) return [];
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? files(file) : [file];
  });
}

const assets = [...new Set([
  '/', '/manifest.json', '/favicon.ico',
  ...files('public').filter((file) => !['public/sw.js', 'public/offline-assets.js'].includes(file))
    .map((file) => `/${path.relative('public', file)}`),
  ...files('.next/static').map((file) => `/_next/${path.relative('.next', file)}`),
])];
const build = fs.readFileSync('.next/BUILD_ID', 'utf8').trim();
const version = crypto.createHash('sha256').update(build).digest('hex').slice(0, 16);
const manifest = `self.OFFLINE_BUILD = ${JSON.stringify(version)};\n`
  + `self.OFFLINE_ASSETS = ${JSON.stringify(assets)};\n`;
fs.writeFileSync('public/offline-assets.js', manifest);
console.log(`Prepared ${assets.length} offline resources for build ${build}`);
