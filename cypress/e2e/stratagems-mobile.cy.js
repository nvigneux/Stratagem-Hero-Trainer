/* eslint-disable no-undef */
describe('Stratagem Trainer Mobile - Gameplay and Settings', () => {
  beforeEach(() => {
    // Set viewport to mobile size
    cy.viewport('ipad-mini');
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="button-side-stratagems"]').should('exist');
    cy.get('[data-testid="button-side-stratagems"]').click();
  });

  it('Validates mobile gameplay flow with keyboard layout', () => {
    // Disable all stratagems
    cy.toggleCheckbox('[data-testid="checkbox-all"]', false);

    // Select a stratagem
    cy.selectStratagem('Machine Gun');

    // Close the side stratagems
    cy.get('[data-testid="button-side-stratagems"]').click();

    // Perform a correct combination
    cy.performClickCombination(['keyboard-down',
      'keyboard-left',
      'keyboard-down',
      'keyboard-up',
      'keyboard-right',
    ], 6);

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

  it('Validates mobile gameplay flow with D-pad layout', () => {
    // Switch to D-pad layout
    cy.get('[data-testid="dpad-button"]').click();

    // Disable all stratagems
    cy.toggleCheckbox('[data-testid="checkbox-all"]', false);

    // Select a stratagem
    cy.selectStratagem('Machine Gun');

    // Use D-pad controls
    cy.performClickCombination(['dpad-down', 'dpad-left', 'dpad-down', 'dpad-up', 'dpad-right'], 6);

    // Check if the round is incremented
    cy.get('[data-testid="round-info"]').should('have.text', '2');
    cy.get('[data-testid="round-bonus"]').should('have.text', '75');
    cy.get('[data-testid="perfect-round"]').should('have.text', '100');
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
});
