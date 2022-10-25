/// <reference types="cypress" />

export {};

context('Given a user is on the Home page', () => {
  const baseUrl = Cypress.config('baseUrl');
  context('When the user clicks the Logo in the Site Header', () => {
    specify('Then the link goes to the Home page', () => {
      cy.visit('/');
      cy.findByRole('link', {
        name: 'Return to the Sparkeats Home page.',
      }).click();
      cy.url().should('eq', baseUrl);
    });
  });

  context('When the user clicks the image on a Location Card', () => {
    specify('Then the user goes to the correct Location Page', () => {
      cy.visit('/');
      cy.findByRole('link', {
        name: 'review page for Jimmy Johns',
      }).click();
      cy.url().should('eq', `${baseUrl}locations/22`);
    });
  });

  context('When the user goes to the heading on a Location Card', () => {
    specify('Then the correct heading is accessible', () => {
      cy.visit('/');
      cy.findByRole('heading', {
        name: 'Jimmy Johns',
      });
    });
  });

  context('When the user clicks the heading on a Location Card', () => {
    specify('Then the user goes to the correct Location Page', () => {
      cy.visit('/');
      cy.findByRole('link', {
        name: 'Jimmy Johns',
      }).click();
      cy.url().should('eq', `${baseUrl}locations/22`);
    });
  });
});
