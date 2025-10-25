import Chance from 'chance'
var chance = new Chance()

describe('Conjunto de Teste', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  context('Cadastros de Usuários', () => {
    it('Registrar Usuário válido', () => {
      cy.get('#slider-carousel div.active h1').contains('AutomationExercise');
      cy.get('#header a[href="/login"]').click();
      cy.get('#form div.signup-form h2').should('have.text', 'New User Signup!');
      cy.get('[data-qa="signup-name"]').type(chance.name());
      cy.get('[data-qa="signup-email"]').type(chance.email());
      cy.get('[data-qa="signup-button"]').click();
      cy.location('pathname').should('equal', '/signup');
      cy.get('#form h2:nth-child(1) b').should('have.text', 'Enter Account Information');
    })
  })

})

