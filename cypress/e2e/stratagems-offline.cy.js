/* eslint-disable no-undef */
const evaluate = (expression) => cy.task('evaluateOfflineBrowser', expression);
const waitFor = (expression) => cy.task('waitForOfflineBrowser', expression);
const element = (id) => `document.querySelector('[data-testid="${id}"]')`;
const click = (id) => evaluate(`${element(id)}.click()`);
describe('Stratagem Trainer - Offline', { browser: 'chrome' }, () => {
  afterEach(() => {
    cy.task('closeOfflineBrowser');
  });

  it('reloads, plays and saves preferences without a network connection', () => {
    // A separate browser target lets the application reload without Cypress's injected resources.
    cy.task('openOfflineBrowser', Cypress.config('baseUrl'));
    waitFor('Boolean(navigator.serviceWorker.controller)');
    cy.task('commandOfflineBrowser', {
      method: 'Network.setCacheDisabled', params: { cacheDisabled: true },
    });
    cy.task('commandOfflineBrowser', {
      method: 'Network.emulateNetworkConditions',
      params: {
        offline: true, latency: 0, downloadThroughput: -1, uploadThroughput: -1,
      },
    });
    cy.task('reloadOfflineBrowser');
    waitFor('Boolean(document.querySelector(".container-is-opened"))');
    evaluate('navigator.onLine').should('eq', false);

    click('button-settings');
    evaluate(`(() => {
      const input = document.querySelector('[data-testid="timer-duration-input"]');
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, '23');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      document.querySelector('[data-testid="save-timer-duration"]').click();
    })()`);
    waitFor('JSON.parse(localStorage.getItem(\'h2-settings\'))?.timerDuration === 23');
    click('settings-overlay');

    for (let index = 0; index < 6; index += 1) {
      evaluate('document.querySelector(\'[data-testid="score"]\').textContent')
        .then((previousScore) => {
          evaluate("document.querySelector('.game-card-is-active').title")
            .then((title) => {
              const arrows = [...title].filter((character) => '↑↓←→'.includes(character));
              expect(arrows.length).to.be.greaterThan(0);
              arrows.forEach((arrow) => {
                const key = {
                  '↑': 'ArrowUp', '↓': 'ArrowDown', '←': 'ArrowLeft', '→': 'ArrowRight',
                }[arrow];
                ['keyDown', 'keyUp'].forEach((type) => {
                  cy.task('commandOfflineBrowser', {
                    method: 'Input.dispatchKeyEvent', params: { type, key, code: key },
                  });
                });
              });
              waitFor(`${element('score')}.textContent !== '${previousScore}'`);
            });
        });
    }
    evaluate(`${element('round-info')}.textContent`)
      .should('eq', '2');
    waitFor(`(() => {
      const image = document.querySelector('.game-card-is-active img');
      return image.complete && image.naturalWidth > 0 && !image.src.includes('question-mark');
    })()`);
    evaluate(`Promise.all([
      'press-1', 'press-2', 'error', 'finish', 'new-round', 'game-over'
    ].map(name => fetch('/sounds/stratagem-code-' + name + '.mp3')
      .then(response => response.ok)))`).should('deep.eq', Array(6).fill(true));

    evaluate("Number(localStorage.getItem('h2-hero-best_score'))")
      .should('be.greaterThan', 0).then((bestScore) => {
        cy.task('reloadOfflineBrowser');
        cy.task(
          'waitForOfflineBrowser',
          'Boolean(document.querySelector(\'[data-testid="button-settings"]\'))',
        );
        evaluate("Number(localStorage.getItem('h2-hero-best_score'))")
          .should('eq', bestScore);
      });
    click('button-settings');
    evaluate(`${element('timer-duration-input')}.value`)
      .should('eq', '23');
  });
});
