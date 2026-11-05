// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Cached HTML bypasses Cypress's proxy instrumentation on subsequent visits.
// Ordinary UI specs use the proxy; the offline spec tests the real worker in
// its isolated Chrome instance, which does not load this support file.
// eslint-disable-next-line no-undef
Cypress.on('window:before:load', (win) => {
  const { serviceWorker } = win.navigator;
  if (serviceWorker) serviceWorker.register = () => Promise.resolve();
});
