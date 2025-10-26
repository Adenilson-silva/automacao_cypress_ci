// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, senha) => {
  cy.session([email, senha], () => {
    cy.visit('/login');
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(senha, { log: false });
    cy.get('[data-qa="login-button"]').click();
    cy.get('#header a[href="/logout"]').should('have.text', ' Logout');
  })
})

Cypress.Commands.add('VerificarLoginApi', (email, senha) => {
  cy.request({
    method: 'POST',
    url: Cypress.env('api_verificar_login'),
    body: {
      email: email,
      password: senha
    } 
  }).then(response => {
    expect(response.status).to.eq(200);
  })
})