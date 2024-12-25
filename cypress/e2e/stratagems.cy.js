describe("Stratagem Trainer - Gameplay and Settings", () => {
  it("Validates gameplay flow and settings adjustments", () => {
    cy.visit("http://localhost:3000/");

    // wait for StrategemsLayout_opened__ybJp_ to be visible
    cy.get(".StrategemsLayout_opened__ybJp_").should("exist");

    cy.toggleCheckbox(
      ".StrategemsLayout_checkboxAll__ZLN7R > .Checkbox_checkbox-checkmark__kP1Gy",
      false
    );

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
    cy.get(".RoundInfo_round__WYuUI").should("have.text", "2");
    cy.get(":nth-child(1) > .ScoreInfo_bonusValue__ZTzmJ").should(
      "have.text",
      "75"
    );
    cy.get(":nth-child(3) > .ScoreInfo_bonusValue__ZTzmJ").should(
      "have.text",
      "100"
    );

    // Change sound settings
    cy.get(".StratagemsGame_buttonSettings__JIFMu").click();
    cy.get("#gameSound").check();
    cy.get(":nth-child(1) > .Form_form__OfmeG > .Button_button__yboYn").click();

    // Change timer settings
    cy.get("#timerDuration").clear();
    cy.get("#timerDuration").type("5");
    cy.get(":nth-child(2) > .Form_form__OfmeG > .Button_button__yboYn").click();

    // click to close the settings
    cy.get(".StratagemsGame_settingsOverlay__RuniU").click();

    // Check if game is loose
    cy.get(":nth-child(1) > .ScoreInfo_bonusValue__ZTzmJ").should(
      "have.text",
      "0"
    );
  });

  it("Persists sound and timer settings after reload", () => {
    cy.setSettings(5);
    cy.visit("http://localhost:3000/");
    cy.get(".StratagemsGame_buttonSettings__JIFMu").click();
    cy.get("#timerDuration").should("have.value", "5");
  });

  it("Allows selecting and displaying stratagems", () => {
    cy.visit("http://localhost:3000/");

    // wait for StrategemsLayout_opened__ybJp_ to be visible
    cy.get(".StrategemsLayout_opened__ybJp_").should("exist");

    cy.toggleCheckbox(
      ".StrategemsLayout_checkboxAll__ZLN7R > .Checkbox_checkbox-checkmark__kP1Gy",
      false
    );

    // Select a stratagem
    cy.selectStratagem("Machine Gun");
    cy.get(".StratagemsCard_active__rDaiJ").should("exist");
    cy.get(".StratagemsCard_active__rDaiJ").should("have.length", 1);
  });

  it("Handles successful and failed combinations", () => {
    cy.visit("http://localhost:3000/");

    // wait for StrategemsLayout_opened__ybJp_ to be visible
    cy.get(".StrategemsLayout_opened__ybJp_").should("exist");

    cy.toggleCheckbox(
      ".StrategemsLayout_checkboxAll__ZLN7R > .Checkbox_checkbox-checkmark__kP1Gy",
      false
    );

    // Select a stratagem
    cy.selectStratagem("Machine Gun");

    // Perform a correct combination
    cy.performKeyCombination(["down", "left", "down", "up", "right"], 1);
    cy.get(".ScoreInfo_score__xU7Z2").should("have.text", "25");

    // Make a mistake in the combination
    cy.performKeyCombination(["down", "left", "up", "up", "right"], 1);
    cy.get(".ScoreInfo_score__xU7Z2").should("have.text", "25");
  });
});
