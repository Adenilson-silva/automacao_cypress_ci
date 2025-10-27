import Chance from 'chance'
var chance = new Chance()

describe('Conjunto de Teste', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Cadastros de Usuários', () => {
    it('Registrar Usuário válido', () => {
      let primeiroNome = chance.first();
      let ultimoNome = chance.last();
      let nome = primeiroNome + " " + ultimoNome
      let email = chance.email();
      let dia = chance.integer({ min: 1, max: 28 });
      let mes = chance.integer({ min: 1, max: 12 });
      let ano = chance.year({min: 1900, max: 2000});
      let empresa = chance.company();
      let endereco = chance.address();
      let state = chance.state();
      let city = chance.city();
      let zipcode = chance.zip();
      let phone = chance.phone();
      cy.get('#slider-carousel div.active h1').contains('AutomationExercise');
      cy.get('#header a[href="/login"]').click();
      cy.get('#form div.signup-form h2').should('have.text', 'New User Signup!');
      cy.get('[data-qa="signup-name"]').type(nome);
      cy.get('[data-qa="signup-email"]').type(email);
      cy.get('[data-qa="signup-button"]').click();
      cy.location('pathname').should('equal', '/signup');
      cy.get('#form h2:nth-child(1) b').should('have.text', 'Enter Account Information');
      cy.get('#id_gender1').check();
      cy.get('[data-qa="name"]').should('have.value', nome);
      cy.get('[data-qa="email"]').should('have.value', email);
      cy.get('[data-qa="password"]').type('123456789', {log: false});
      cy.get('[data-qa="days"]').select(dia);
      cy.get('[data-qa="months"]').select(mes);
      cy.get('[data-qa="years"]').select(ano);
      cy.get('[name="newsletter"]').check();
      cy.get('[name="optin"]').check();
      cy.get('[data-qa="first_name"]').type(primeiroNome);
      cy.get('[data-qa="last_name"]').type(ultimoNome);
      cy.get('[data-qa="company"]').type(empresa);
      cy.get('[data-qa="address"]').type(endereco);
      cy.get('[data-qa="country"]').select('United States');
      cy.get('[data-qa="state"]').type(state);
      cy.get('[data-qa="city"]').type(city);
      cy.get('[data-qa="zipcode"]').type(zipcode);
      cy.get('[data-qa="mobile_number"]').type(phone);
      cy.get('[data-qa="create-account"]').click();
      cy.get('[data-qa="account-created"] b').should('have.text', 'Account Created!');
      cy.get('#form p:nth-child(2)').should('have.text', 'Congratulations! Your new account has been successfully created!');
      cy.get('#form p:nth-child(3)').should('have.text', 'You can now take advantage of member privileges to enhance your online shopping experience with us.');
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

    it('Comprar', () => {
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

