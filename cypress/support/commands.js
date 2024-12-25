/**
 * Check if a checkbox is checked or not
 * @param {string} selector - The selector of the checkbox
 * @param {boolean} shouldBeChecked - Whether the checkbox should be checked or not
 */
Cypress.Commands.add("toggleCheckbox", (selector, shouldBeChecked) => {
  cy.get(selector).click({ force: true });
  const assertion = shouldBeChecked ? "be.checked" : "not.be.checked";
  cy.get(selector).should(assertion);
});

/**
 * Select a stratagem by name
 * @param {string} stratagemName - The name of the stratagem to select
 */
Cypress.Commands.add("selectStratagem", (stratagemName) => {
  cy.get(
    `[for="${stratagemName}"] > .StratagemsCard_card__sdnRd > .StratagemsCard_icon__bngXX`
  ).click();
  cy.get(`[id="${stratagemName}"]`).check({ force: true });
  cy.get(
    ".StratagemsGameCard_active__UNhvJ > .StratagemsGameCard_icon__yPyqA"
  ).should("have.attr", "alt", stratagemName);
});

/**
 * Perform a series of key presses
 * @param {string[]} keys - The keys to press
 * @param {number} [times=1] - The number of times to press the keys
 */
Cypress.Commands.add("performKeyCombination", (keys, times = 1) => {
  for (let i = 0; i < times; i++) {
    keys.forEach((key) => {
      cy.get("body").click().type(`{${key}arrow}`).wait(100);
    });
  }
});

// set settings cookies by visiting the page and change input timerDuration
Cypress.Commands.add("setSettings", (timerDuration) => {
  cy.session("h2-settings", () => {
    cy.visit("https://stratagem-hero-trainer.vercel.app/");
    // Change game sound settings
    cy.get(".StratagemsGame_buttonSettings__JIFMu").click();
    cy.wait(500);
    cy.toggleCheckbox("#gameSound", true);
    cy.get(
      ":nth-child(1) > .Form_form__OfmeG > .Button_button__yboYn"
    ).click();

    // Change timer settings
    cy.get("#timerDuration").clear().type(timerDuration);
    cy.get(
      ":nth-child(2) > .Form_form__OfmeG > .Button_button__yboYn"
    ).click();
    cy.wait(500);
  });
});