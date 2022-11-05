/// <reference types="cypress" />

export {};

context('Given a user is on the Location page', () => {
  const baseUrl = Cypress.config('baseUrl');

  context('When the user goes directly to a Location page', () => {
    specify('Then the page loads correctly', () => {
      cy.visit('/locations/32');
    });
  });

  context('When the user clicks the "Back to home" link', () => {
    specify('Then the user is directed to the Home page', () => {
      cy.visit('/locations/32');
      cy.findByRole('link', {
        name: /Back to home/,
      }).click();
      cy.url().should('eq', baseUrl);
    });
  });

  context('When the user clicks the "Add a review" link', () => {
    specify('Then the user is directed to the Home page', () => {
      cy.visit('/locations/32');
      cy.findByRole('link', {
        name: /Add a review/,
      }).click();
      cy.url().should('eq', `${baseUrl}reviews/new`);
    });
  });
});
