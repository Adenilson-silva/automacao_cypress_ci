import Chance from 'chance'
var chance = new Chance()

describe('Conjunto de Teste', () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllSessionStorage();
    cy.clearAllLocalStorage();
    cy.visit('/');
  });

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

  context('Teste com usuário logado', () => {
    it('Realizar Login', () => {
      cy.get('#header a[href="/login"]').click();
      cy.fixture('usuarios').then((data) => {
        let usuario = data.usuarios[0]
        cy.get('[data-qa="login-email"]').type(usuario.email);
        cy.get('[data-qa="login-password"]').type(usuario.senha, { log: false });
        cy.get('[data-qa="login-button"]').click();
        cy.get('#header a[href="/logout"]').should('have.text', ' Logout');
        cy.get('#header li:nth-child(10) a').should('have.text', ' Logged in as ' + usuario.nome);
      })
    })

    it.only('Comprar', () => {
      cy.get('#header a[href="/login"]').click();
      cy.fixture('usuarios').then((data) => {
        let usuario = data.usuarios[0]
        cy.login(usuario.email, usuario.senha)
      })
      cy.visit('/')
      cy.get('a[href="/product_details/1"]').click();
      cy.get('button.cart').click();
      cy.get('#cartModal h4.modal-title').should('have.text', 'Added!');
      cy.get('#cartModal i.material-icons').should('be.visible');
      cy.get('#cartModal p:nth-child(1)').should('have.text', 'Your product has been added to cart.');
      cy.get('#cartModal u').should('have.text', 'View Cart');
      cy.get('#cartModal button.close-modal').should('have.class', 'btn');
      cy.get('#cartModal button.close-modal').should('have.text', 'Continue Shopping');
      cy.get('#cartModal u').click();
      cy.get('#product-1 a[href="/product_details/1"]').should('be.visible');
    })
  })
})

