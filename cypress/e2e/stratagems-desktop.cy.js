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

  it('Persists sound and timer settings after reload', () => {
    cy.setSettings(5);
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="button-settings"]').click();
    cy.get('[data-testid="timer-duration-input"]').should('have.value', '5');
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

    // Vérifier que la combinaison a bien fonctionné
    cy.get('[data-testid="score"]').should('have.text', '25');
  });
});
