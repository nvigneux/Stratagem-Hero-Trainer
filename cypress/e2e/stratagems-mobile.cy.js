/* eslint-disable no-undef */
describe('Stratagem Trainer Mobile - Gameplay and Settings', () => {
  beforeEach(() => {
    // Set viewport to mobile size
    cy.viewport('iphone-xr');
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="button-side-stratagems"]').should('exist');
    cy.get('[data-testid="button-side-stratagems"]').click();
  });

  it('Validates mobile gameplay flow with keyboard layout', () => {
    // Disable all stratagems
    cy.toggleCheckbox('[data-testid="checkbox-all"]', false);

    // search for a stratagem
    cy.get('[data-testid="search-stratagems"]').type('Machine Gun');

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
    cy.wait(100);
    cy.toggleCheckbox('[data-testid="checkbox-game-sound"]', true);
    cy.wait(100);
    cy.get('[data-testid="save-game-sound"]').click();

    // Modify timer settings
    cy.get('[data-testid="timer-duration-input"]').clear().type('5');
    cy.wait(100);
    cy.get('[data-testid="save-timer-duration"]').click();
    cy.wait(100);

    // Close settings
    cy.get('[data-testid="settings-overlay"]').click({ force: true });

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

    // Close the side stratagems
    cy.get('[data-testid="button-side-stratagems"]').click();

    // Use D-pad controls
    cy.performClickCombination(['dpad-down', 'dpad-left', 'dpad-down', 'dpad-up', 'dpad-right'], 6);

    // Check if the round is incremented
    cy.get('[data-testid="round-info"]').should('have.text', '2');
    cy.get('[data-testid="round-bonus"]').should('have.text', '75');
    cy.get('[data-testid="perfect-round"]').should('have.text', '100');
  });

  it('Persists settings after reload', () => {
    cy.setSettings(5);
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="button-settings"]').click();
    cy.get('[data-testid="checkbox-training-stratagem-jammer"]').should('be.checked');
    cy.get('[data-testid="timer-duration-input"]').should('have.value', '5');
    cy.get('[data-testid="text-noise-effect"]').should('have.text', 'Jammed');
  });

  it('Validates mobile layout switching and persistence', () => {
    // Close the side stratagems
    cy.get('[data-testid="button-side-stratagems"]').click();

    // Check default keyboard layout
    cy.get('[data-testid="mobile-keyboard"]').should('be.visible');

    // Switch to D-pad layout
    cy.get('[data-testid="dpad-button"]').click();
    cy.get('[data-testid="mobile-dpad"]').should('be.visible');

    // Reload page and check if layout persists
    cy.reload();
    cy.get('[data-testid="mobile-dpad"]').should('be.visible');

    // Switch back to keyboard
    cy.get('[data-testid="keyboard-button"]').click();
    cy.get('[data-testid="mobile-keyboard"]').should('be.visible');
  });

  it('Allows selecting and displaying stratagems', () => {
    // Disable all stratagems
    cy.toggleCheckbox('[data-testid="checkbox-all"]', false);

    // Select a stratagem
    cy.selectStratagem('Machine Gun');
    cy.get('.card-is-active').should('exist').and('have.length', 1);
  });

  it('Handles training mode settings', () => {
    // Modify sound settings
    cy.get('[data-testid="button-settings"]').click();
    cy.wait(100);
    cy.toggleCheckbox('[data-testid="checkbox-training-stratagem-jammer"', true);
    cy.wait(100);
    cy.get('[data-testid="save-training-mode"]').click();

    // Close settings
    cy.get('[data-testid="settings-overlay"]').click({ force: true });

    // Switch to D-pad layout
    cy.get('[data-testid="dpad-button"]').click();

    // Disable all stratagems
    cy.toggleCheckbox('[data-testid="checkbox-all"]', false);

    // Select a stratagem
    cy.selectStratagem('Machine Gun');

    // Close the side stratagems
    cy.get('[data-testid="button-side-stratagems"]').click();

    // Use D-pad controls
    cy.performClickCombination(['dpad-down', 'dpad-left', 'dpad-down', 'dpad-up', 'dpad-right'], 6);

    // Check if the round is incremented
    cy.get('[data-testid="round-info"]').should('have.text', '2');
    cy.get('[data-testid="round-bonus"]').should('have.text', '75');
    cy.get('[data-testid="perfect-round"]').should('have.text', '100');
  });

  it('Display round history', () => {
    // Disable all stratagems
    cy.toggleCheckbox('[data-testid="checkbox-all"]', false);

    // Select a stratagem
    cy.selectStratagem('Machine Gun');
    cy.wait(100);

    // Close the side stratagems
    cy.get('[data-testid="button-side-stratagems"]').click();

    // Perform a correct combination
    cy.performKeyCombination(['downarrow', 'leftarrow', 'downarrow', 'uparrow', 'rightarrow'], 6);

    // Check round history
    cy.get('[data-testid="round-history"]').should('exist');
    cy.get('[data-testid="round-history"]').click();
    cy.get('[data-testid="stats-button-history-label-mobile"]')
      .should('have.text', 'History');
    cy.get('[data-testid="stats-button-history-small"]').should('have.text', '1');
    cy.get('[data-testid="round-history-title"]').should('have.text', 'Round 1');
    cy.get('[data-testid="round-history-row"]').should('have.length', 6);
  });

  it('Display stratagem stats', () => {
    // Disable all stratagems
    cy.toggleCheckbox('[data-testid="checkbox-all"]', false);

    // Select a stratagem
    cy.selectStratagem('Machine Gun');
    cy.wait(100);

    // Close the side stratagems
    cy.get('[data-testid="button-side-stratagems"]').click();

    // Perform a correct combination
    cy.performKeyCombination(['downarrow', 'leftarrow', 'downarrow', 'uparrow', 'rightarrow'], 6);

    // Check stratagem stats
    cy.get('[data-testid="round-history"]').should('exist');
    cy.get('[data-testid="round-history"]').click();
    cy.get('[data-testid="stats-button-stats-label-mobile"]')
      .should('have.text', 'Stats');
    cy.get('[data-testid="stats-button-stats-small"]').should('have.text', '1');
    cy.get('[data-testid="stats-button-stats"]').click();
    cy.get('[data-testid="round-stats-row"]').should('have.length', 1);
  });

  it('Handles landscape mode', () => {
    cy.viewport('iphone-xr', 'landscape');
    cy.wait(500);

    // Disable all stratagems
    cy.toggleCheckbox('[data-testid="checkbox-all"]', false);

    // Select a stratagem
    cy.selectStratagem('Machine Gun');

    // Close the side stratagems
    cy.get('[data-testid="button-side-stratagems"]').click();

    // Use D-pad controls
    cy.performKeyCombination(['downarrow', 'leftarrow', 'downarrow', 'uparrow', 'rightarrow'], 6);

    // Check if the round is incremented
    cy.get('[data-testid="round-info"]').should('have.text', '2');
    cy.get('[data-testid="round-bonus"]').should('have.text', '75');
    cy.get('[data-testid="perfect-round"]').should('have.text', '100');
  });
});
