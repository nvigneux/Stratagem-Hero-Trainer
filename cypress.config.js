const { defineConfig } = require('cypress');
const { createOfflineBrowserTasks } = require('./cypress/support/offline-browser');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on) {
      const browser = createOfflineBrowserTasks();
      on('before:browser:launch', (launchedBrowser) => {
        browser.setExecutable(launchedBrowser.path);
      });
      on('task', browser.tasks);
      on('after:spec', browser.tasks.closeOfflineBrowser);
    },
    experimentalStudio: true,
    viewportWidth: 1440,
    viewportHeight: 800,
  },
});
