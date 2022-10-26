/// <reference types="cypress" />

export {};

context('Given a user goes directly to a New Location page', () => {
  context('When the user is on the New Location page', () => {
    specify('Then the page loads correctly', () => {
      cy.visit('/locations/new');
      cy.findByText(/Location information/i).should('exist');
    });
  });
});
