/* eslint-disable no-undef */
/**
 * Check if a checkbox is checked or not
 * @param {string} selector - The selector of the checkbox
 * @param {boolean} shouldBeChecked - Whether the checkbox should be checked or not
 */
Cypress.Commands.add('toggleCheckbox', (selector, shouldBeChecked) => {
  cy.get(selector).click({ force: true });
  const assertion = shouldBeChecked ? 'be.checked' : 'not.be.checked';
  cy.get(selector).should(assertion);
});

/**
 * Select a stratagem by name
 * @param {string} stratagemName - The name of the stratagem to select
 */
Cypress.Commands.add('selectStratagem', (stratagemName) => {
  cy.get(
    `[data-testid="stratagem-icon-${stratagemName}"]`,
  ).click();
  cy.get(`[id="${stratagemName}"]`).check({ force: true });
  cy.get(`[data-testid="stratagem-icon-${stratagemName}"]`)
    .should('have.attr', 'alt', stratagemName);
});

/**
 * Perform a series of key presses
 * @param {string[]} keys - The keys to press
 * @param {number} [times=1] - The number of times to press the keys
 */
Cypress.Commands.add('performKeyCombination', (keys, times = 1) => {
  for (let i = 0; i < times; i += 1) {
    keys.forEach((key) => {
      cy.get('body').click().type(`{${key}arrow}`).wait(50);
    });
  }
});

// set settings cookies by visiting the page and change input timerDuration
Cypress.Commands.add('setSettings', (timerDuration) => {
  cy.session('h2-settings', () => {
    cy.visit('http://localhost:3000/');
    // Change game sound settings
    cy.get('[data-testid="button-settings"]').click();
    cy.wait(500);
    cy.toggleCheckbox('[data-testid="checkbox-game-sound"', true);
    cy.get('[data-testid="save-game-sound"]').click();

    // Change timer settings
    cy.get('[data-testid="timer-duration-input"]').clear().type(timerDuration);
    cy.get('[data-testid="save-timer-duration"]').click();
    cy.wait(500);
  });
});
