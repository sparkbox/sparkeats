/// <reference types="cypress" />

export {};

const env = {
  development: {
    url: 'http://127.0.0.1:5173/sparkeats/',
  },
};

context('Given a user is on a Home page', () => {
  context(
    'When the user accesses the Sparkeats Logo in the Site Header',
    () => {
      specify('Then the link goes to the Home page', () => {
        cy.visit('/');
        cy.findByRole('link', {
          name: 'Return to the Sparkeats Home page.',
        }).click();
        cy.url().should('eq', env.development.url);
      });
    }
  );
});
