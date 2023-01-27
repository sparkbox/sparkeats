/// <reference types="cypress" />

export {};

context(
  'Given a user clicks the "Add a location" link on the Home page',
  () => {
    const baseUrl = Cypress.config('baseUrl');

    context('When the user is directed to the New Location page', () => {
      specify('Then the page loads correctly', () => {
        cy.visit('/');
        cy.findByRole('link', {
          name: /Add a location/i,
        }).click();
        cy.url().should('eq', `${baseUrl}locations/new`);
        cy.findByText(/Location information/i).should('exist');
      });
    });
  }
);

context('Given a user goes directly to a New Location page', () => {
  context('When the user is on the New Location page', () => {
    specify('Then the page loads correctly', () => {
      cy.visit('/locations/new');
      cy.findByText(/Location information/i).should('exist');
    });
  });
});
