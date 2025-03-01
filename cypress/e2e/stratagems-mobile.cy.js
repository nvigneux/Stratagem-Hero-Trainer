/* eslint-disable no-undef */
describe('Stratagem Trainer Mobile - Gameplay and Settings', () => {
  beforeEach(() => {
    // Set viewport to mobile size
    cy.viewport('iphone-x');
    cy.visit('http://localhost:3000/');
    cy.get('.container-is-opened').should('exist');
  });

  it('Validates mobile layout switching and persistence', () => {
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

  it('Validates mobile gameplay flow with keyboard layout', () => {
    // Disable all stratagems
    cy.toggleCheckbox('[data-testid="checkbox-all"]', false);

    // Select a stratagem
    cy.selectStratagem('Machine Gun');

    // Use mobile keyboard controls
    cy.get('[data-testid="key-down"]').click();
    cy.get('[data-testid="key-left"]').click();
    cy.get('[data-testid="key-down"]').click();
    cy.get('[data-testid="key-up"]').click();
    cy.get('[data-testid="key-right"]').click();

    // Check if the round is incremented
    cy.get('[data-testid="round-info"]').should('have.text', '2');
  });

  it('Validates mobile gameplay flow with D-pad layout', () => {
    // Switch to D-pad layout
    cy.get('[data-testid="dpad-button"]').click();

    // Disable all stratagems
    cy.toggleCheckbox('[data-testid="checkbox-all"]', false);

    // Select a stratagem
    cy.selectStratagem('Machine Gun');

    // Use D-pad controls
    cy.get('[data-testid="dpad-down"]').click();
    cy.get('[data-testid="dpad-left"]').click();
    cy.get('[data-testid="dpad-down"]').click();
    cy.get('[data-testid="dpad-up"]').click();
    cy.get('[data-testid="dpad-right"]').click();

    // Check if the round is incremented
    cy.get('[data-testid="round-info"]').should('have.text', '2');
  });

  it('Handles mobile settings panel', () => {
    // Open settings
    cy.get('[data-testid="button-settings"]').click();

    // Check if settings panel slides in from right
    cy.get('[data-testid="settings-panel"]').should('be.visible');

    // Modify sound settings
    cy.get('[data-testid="checkbox-game-sound"]').check();
    cy.get('[data-testid="save-game-sound"]').click();

    // Close settings via overlay
    cy.get('[data-testid="settings-overlay"]').click();

    // Check if settings panel is hidden
    cy.get('[data-testid="settings-panel"]').should('not.be.visible');
  });

  it('Validates mobile responsive layout', () => {
    // Check if desktop elements are hidden
    cy.get('.buttonLabelDesktop').should('not.be.visible');

    // Check if mobile keyboard is visible by default
    cy.get('.mobileKeyboard').should('be.visible');

    // Check if settings panel has correct mobile width
    cy.get('[data-testid="button-settings"]').click();
    cy.get('.settings').should('have.css', 'width', '250px');
  });
});
