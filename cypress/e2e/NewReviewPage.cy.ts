/// <reference types="cypress" />

export {};

context(
  'Given a user clicks the "Add a review" link on the Location page',
  () => {
    const baseUrl = Cypress.config('baseUrl');

    context('When the user is directed to the New Location page', () => {
      specify('Then the page loads correctly', () => {
        cy.visit('/locations/32');
        cy.findByRole('link', {
          name: /Add a review/,
        }).click();
        cy.url().should('eq', `${baseUrl}reviews/new`);
        cy.findByText(/Review/i).should('exist');
      });
    });
  }
);
