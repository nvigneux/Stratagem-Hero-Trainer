const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('before:browser:launch', (browser, launchOptions) => ({
        ...launchOptions,
        // Force a deterministic Accept-Language so next-intl resolves to 'en'
        // regardless of the host machine's system language.
        preferences: {
          ...launchOptions.preferences,
          defaultLanguage: ['en-US', 'en'],
        },
      }));
    },
    experimentalStudio: true,
    viewportWidth: 1440,
    viewportHeight: 800,
  },
});
