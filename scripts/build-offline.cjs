// Run after Next builds so every lazy chunk (including audio) is available offline.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

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
fs.writeFileSync('public/offline-assets.js',
  `self.OFFLINE_BUILD = ${JSON.stringify(version)};\nself.OFFLINE_ASSETS = ${JSON.stringify(assets)};\n`);
console.log(`Prepared ${assets.length} offline resources for build ${build}`);
