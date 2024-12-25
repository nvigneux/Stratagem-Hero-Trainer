const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
    experimentalStudio: true,
    viewportWidth: 1440,
    viewportHeight: 800,
  },
});
