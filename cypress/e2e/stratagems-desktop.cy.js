/* eslint-disable no-undef */
describe('Stratagem Trainer - Gameplay and Settings', () => {
  beforeEach(() => {
    // Centralize the visit and initial wait
    cy.visit('http://localhost:3000/');
    cy.get('.container-is-opened').should('exist');
  });

  it('Validates gameplay flow and settings adjustments', () => {
    // Disable all stratagems
    cy.toggleCheckbox('[data-testid="checkbox-all"]', false);

    // Check the message and round information
    cy.get('[data-testid="stratagem-name"]').should('have.text', 'Traitor detected !');
    cy.get('[data-testid="round-info"]').should('have.text', '1');

    // search for a stratagem
    cy.get('[data-testid="search-stratagems"]').type('Machine Gun');

    // Select a stratagem
    cy.selectStratagem('Machine Gun');

    // Perform a correct combination
    cy.performKeyCombination(['downarrow', 'leftarrow', 'downarrow', 'uparrow', 'rightarrow'], 6);

    // Check if the round is incremented
    cy.get('[data-testid="round-info"]').should('have.text', '2');
    cy.get('[data-testid="round-bonus"]').should('have.text', '75');
    cy.get('[data-testid="perfect-round"]').should('have.text', '100');

    // Modify sound settings
    cy.get('[data-testid="button-settings"]').click();
    cy.get('[data-testid="checkbox-game-sound"]').check();
    cy.get('[data-testid="save-game-sound"]').click();

    // Modify timer settings
    cy.get('[data-testid="timer-duration-input"]').clear().type('5');
    cy.get('[data-testid="save-timer-duration"]').click();

    // Close settings
    cy.get('[data-testid="settings-overlay"]').click();

    // Check if the game is lost
    cy.get('[data-testid="round-bonus"]').should('have.text', '0');
  });

  it('Persists settings after reload', () => {
    cy.setSettings(5);
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="button-settings"]').click();
    cy.get('[data-testid="checkbox-training-stratagem-jammer"]').should('be.checked');
    cy.get('[data-testid="timer-duration-input"]').should('have.value', '5');
    cy.get('[data-testid="text-noise-effect"]').should('have.text', 'Jammed');
  });

  it('Allows selecting and displaying stratagems', () => {
    // Disable all stratagems
    cy.toggleCheckbox('[data-testid="checkbox-all"]', false);

    // Select a stratagem
    cy.selectStratagem('Machine Gun');
    cy.get('.card-is-active').should('exist').and('have.length', 1);
  });

  it('Handles successful and failed combinations', () => {
    // Disable all stratagems
    cy.toggleCheckbox('[data-testid="checkbox-all"]', false);

    // Select a stratagem
    cy.selectStratagem('Machine Gun');

    // Perform a correct combination
    cy.performKeyCombination(['downarrow', 'leftarrow', 'downarrow', 'uparrow', 'rightarrow'], 1);
    cy.get('[data-testid="score"]').should('have.text', '25');

    // Perform an incorrect combination
    cy.performKeyCombination(['downarrow', 'leftarrow', 'uparrow', 'uparrow', 'rightarrow'], 1);
    cy.get('[data-testid="score"]').should('have.text', '25');
    cy.get('.arrow-is-active').should('not.exist');
  });

  it('Handles update key bindings settings', () => {
    cy.toggleCheckbox('[data-testid="checkbox-all"]', false);
    cy.get('[data-testid="button-settings"]').click();

    cy.get('[data-testid="key-up"]').clear().type('{c}');
    cy.get('[data-testid="key-down"]').clear().type('{v}');
    cy.get('[data-testid="key-left"]').clear().type('{b}');
    cy.get('[data-testid="key-right"]').clear().type('{n}');
    cy.get('[data-testid="save-key-bindings"]').click();

    cy.get('[data-testid="settings-overlay"]').click();

    cy.selectStratagem('Machine Gun');
    cy.performKeyCombination(
      ['keyv', 'keyb', 'keyv', 'keyc', 'keyn'],
      1,
      { parseSpecialCharSequences: false },
    );

    // Check if the combination worked
    cy.get('[data-testid="score"]').should('have.text', '25');
  });

  it('Handles training mode settings', () => {
    cy.get('[data-testid="button-settings"]').click();
    cy.toggleCheckbox('[data-testid="checkbox-training-stratagem-jammer"', true);
    cy.get('[data-testid="save-training-mode"]').click();
    cy.get('[data-testid="settings-overlay"]').click();

    // Disable all stratagems
    cy.toggleCheckbox('[data-testid="checkbox-all"]', false);

    // Select a stratagem
    cy.selectStratagem('Machine Gun');

    // Perform a correct combination
    cy.performKeyCombination(['downarrow', 'leftarrow', 'downarrow', 'uparrow', 'rightarrow'], 1);
    cy.get('[data-testid="score"]').should('have.text', '25');

    // Perform an incorrect combination
    cy.performKeyCombination(['downarrow', 'leftarrow', 'uparrow', 'uparrow', 'rightarrow'], 1);
    cy.get('[data-testid="score"]').should('have.text', '25');
    cy.get('.arrow-is-active').should('not.exist');
  });

  it('Display round history', () => {
    // Disable all stratagems
    cy.toggleCheckbox('[data-testid="checkbox-all"]', false);

    // Check the message and round information
    cy.get('[data-testid="stratagem-name"]').should('have.text', 'Traitor detected !');
    cy.get('[data-testid="round-info"]').should('have.text', '1');

    // Select a stratagem
    cy.selectStratagem('Machine Gun');

    // Perform a correct combination
    cy.performKeyCombination(['downarrow', 'leftarrow', 'downarrow', 'uparrow', 'rightarrow'], 6);

    // Check round history
    cy.get('[data-testid="round-history"]').should('exist');
    cy.get('[data-testid="round-history"]').click();
    cy.get('[data-testid="stats-button-history-label-desktop"]')
      .should('have.text', 'Round history');
    cy.get('[data-testid="stats-button-history-small"]').should('have.text', '1');
    cy.get('[data-testid="round-history-title"]').should('have.text', 'Round 1');
    cy.get('[data-testid="round-history-row"]').should('have.length', 6);
  });

  it('Display stratagem stats', () => {
    // Disable all stratagems
    cy.toggleCheckbox('[data-testid="checkbox-all"]', false);

    // Check the message and round information
    cy.get('[data-testid="stratagem-name"]').should('have.text', 'Traitor detected !');
    cy.get('[data-testid="round-info"]').should('have.text', '1');

    // Select a stratagem
    cy.selectStratagem('Machine Gun');

    // Perform a correct combination
    cy.performKeyCombination(['downarrow', 'leftarrow', 'downarrow', 'uparrow', 'rightarrow'], 6);

    // Check stratagem stats
    cy.get('[data-testid="round-history"]').should('exist');
    cy.get('[data-testid="round-history"]').click();
    cy.get('[data-testid="stats-button-stats-label-desktop"]')
      .should('have.text', 'Stratagem stats');
    cy.get('[data-testid="stats-button-stats-small"]').should('have.text', '1');
    cy.get('[data-testid="stats-button-stats"]').click();
    cy.get('[data-testid="round-stats-row"]').should('have.length', 1);
  });
});
