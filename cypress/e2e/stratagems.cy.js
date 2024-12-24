describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://stratagem-hero-trainer.vercel.app/");
    /* ==== Generated with Cypress Studio ==== */
    cy.toggleCheckbox(
      ".StrategemsLayout_checkboxAll__ZLN7R > .Checkbox_checkbox-checkmark__kP1Gy",
      false
    )

    // Check msg when no stratagem is selected
    cy.get(".StratagemsName_name__E4XEJ").should(
      "have.text",
      "Traitor detected !"
    );
    cy.get(".RoundInfo_round__WYuUI").should("have.text", "1");

    // Select a stratagem
    cy.selectStratagem("Machine Gun");

    // Perform a key combination
    cy.performKeyCombination(["down", "left", "down", "up", "right"], 6);

    // Check if round is incremented
    cy.get('.RoundInfo_round__WYuUI').should('have.text', '2');
    cy.get(':nth-child(1) > .ScoreInfo_bonusValue__ZTzmJ').should('have.text', '75');
    cy.get(':nth-child(3) > .ScoreInfo_bonusValue__ZTzmJ').should('have.text', '100');

    // Change sound settings
    cy.get('.StratagemsGame_buttonSettings__JIFMu').click();
    cy.get('#gameSound').check();
    cy.get(':nth-child(1) > .Form_form__OfmeG > .Button_button__yboYn').click();

    // Change timer settings
    cy.get('#timerDuration').clear();
    cy.get('#timerDuration').type('1');
    cy.get(':nth-child(2) > .Form_form__OfmeG > .Button_button__yboYn').click();

    // click to close the settings
    cy.get('.StratagemsGame_settingsOverlay__RuniU').click();

    // Check if game is loose
    cy.get(':nth-child(1) > .ScoreInfo_bonusValue__ZTzmJ').should('have.text', '0');
  });
});
