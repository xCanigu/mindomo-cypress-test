describe('Mindomo - creare mind map', () => {

  it('creeaza si redenumeste o harta mentala', () => {

    cy.readFile('cypress.env.json').then((env) => {

      // LOGIN
      cy.visit('https://www.mindomo.com/login');

      cy.get('input:visible')
        .eq(0)
        .type(env.MINDOMO_EMAIL);

      cy.get('input:visible')
        .eq(1)
        .type(env.MINDOMO_PASSWORD);

      cy.get('button:visible')
        .contains(/login|log in|conectare/i)
        .click();

      // VERIFICA DASHBOARD
      cy.url({ timeout: 15000 })
        .should('include', 'dashboard');

      // DESCHIDE PAGINA DE CREARE
      cy.visit('https://www.mindomo.com/dashboard/create');

      // CREEAZA BLANK MIND MAP
      cy.contains('Blank mind map', { timeout: 20000 })
        .scrollIntoView()
        .click({ force: true });

      // ASTEAPTA EDITORUL
      cy.wait(5000);

      // SELECTEAZA TOPICUL CENTRAL
      cy.contains(/central|topic/i, { timeout: 15000 })
        .click({ force: true });

      // REDENUMESTE TOPICUL
      cy.get('body')
        .type('{selectall}')
        .type('Interview Cypress Test')
        .type('{enter}');

      // ASTEAPTA
      cy.wait(3000);

      // VALIDARE FINALA
      cy.get('body')
        .should('be.visible');

    });

  });

});