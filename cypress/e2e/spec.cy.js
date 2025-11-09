import Chance from 'chance'

var chance = new Chance()

describe('Test Suite', () => {
  beforeEach(() => {
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
    cy.visit('/')
  })
  afterEach(() => {
   
  })

  context('Cadastro de Novos Usuários', () => {
    it.only('Deve permanecer na mesma página ao submeter o formulário sem o Nome e Email', () => {
      const inicio = Date.now(); // ✅ inicia cronômetro
      cy.get('#header a[href="/login"]').click()

      cy.get('[data-qa="signup-button"]').click()

      cy.location('pathname').should('equal', '/login')
      cy.get('#form div.signup-form h2').should('have.text', 'New User Signup!')

      cy.then(() => {
        const fim = Date.now();
        const tempoTotal = fim - inicio;

        // 1. Obtém a data/hora exata no fuso horário de São Paulo (BRT)
        const dataHoraBRT = new Date(fim).toLocaleString('en-CA', {
          timeZone: 'America/Sao_Paulo',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false // Garante o formato 24 horas
        });

        // O resultado de dataHoraBRT será "AAAA-MM-DD, HH:MM:SS" (ex: "2025-11-09, 19:28:32")

        // 2. Converte para o formato AAAA-MM-DDTHH:MM:SS (Ideal para Power BI)
        const dataFormatadaPowerBI = dataHoraBRT.replace(', ', 'T');

        cy.log(`⏱ Tempo total do fluxo: **${tempoTotal} ms**`);
        cy.log(`📅 Fim do teste (Power BI BRT): **${dataFormatadaPowerBI}**`);

        cy.task('registroPerformance', {
          fluxo: 'cadastro_produto',
          'tempoTotal(ms)': tempoTotal,
          data: dataFormatadaPowerBI // ✅ Envia o formato AAAA-MM-DDTHH:MM:SS (BRT)
        })
      })
    })

    it('Deve permanecer na mesma página ao submeter o formulário sem o email', () => {
      const nome = chance.name()
      cy.get('#header a[href="/login"]').click()

      cy.get('[data-qa="signup-name"]').type(nome)
      cy.get('[data-qa="signup-button"]').click()

      cy.location('pathname').should('equal', '/login')
      cy.get('#form div.signup-form h2').should('have.text', 'New User Signup!')
    })

    it('Deve permanecer na mesma página ao submeter o formulário com um formato de email inválido I', () => {
      const nome = chance.name()
      cy.get('#header a[href="/login"]').click()

      cy.get('[data-qa="signup-name"]').type(nome)
      cy.get('[data-qa="signup-email"]').type(nome)
      cy.get('[data-qa="signup-button"]').click()

      cy.location('pathname').should('equal', '/login')
      cy.get('#form div.signup-form h2').should('have.text', 'New User Signup!')
    })

    it('Deve permanecer na mesma página ao submeter o formulário com um formato de email inválido II', () => {
      const nome = chance.name()
      cy.get('#header a[href="/login"]').click()

      cy.get('[data-qa="signup-name"]').type(nome)
      cy.get('[data-qa="signup-email"]').type(nome + "@")
      cy.get('[data-qa="signup-button"]').click()

      cy.location('pathname').should('equal', '/login')
      cy.get('#form div.signup-form h2').should('have.text', 'New User Signup!')
    })

    it.skip('Verificar campos não preenchidos e com valores inválidos - em manutenção', () => {
      const primeiroNome = chance.first()
      const ultimoNome = chance.last()
      const nome = primeiroNome + " " + ultimoNome
      cy.get('#header a[href="/login"]').click()
      cy.get('#form div.signup-form h2').should('have.text', 'New User Signup!')
      cy.get('[data-qa="signup-button"]').click()
      cy.get('[data-qa="signup-name').then(($input) => {
        expect($input[0].checkValidity()).to.be.false
        //expect($input[0].validationMessage).to.include('Preencha este campo.')
        const msg = $input[0].validationMessage
        expect(msg).to.match(/Please fill out this field|Preencha este campo/i)
      })
      cy.get('[data-qa="signup-name"]').type(nome)
      cy.get('[data-qa="signup-button"]').click()
      cy.get('[data-qa="signup-email"]').then(($input) => {
        expect($input[0].checkValidity()).to.be.false
        //expect($input[0].validationMessage).to.include('Preencha este campo.')
        const msg = $input[0].validationMessage
        expect(msg).to.match(/Please fill out this field|Preencha este campo/i)
      })
      cy.get('[data-qa="signup-email"]').type(primeiroNome)
      cy.get('[data-qa="signup-button"]').click()
      cy.get('[data-qa="signup-email"]').then(($input) => {
        expect($input[0].checkValidity()).to.be.false
        //expect($input[0].validationMessage).to.include('Inclua um "@" no endereço de e-mail')
        const msg = $input[0].validationMessage
        expect(msg).to.match(/Please include an '@' in the email address|Inclua um "@" no endereço de e-mail/i)
      })
      cy.get('[data-qa="signup-email"]').clear().type(primeiroNome + "@")
      cy.get('[data-qa="signup-button"]').click()
      cy.get('[data-qa="signup-email"]').then(($input) => {
        expect($input[0].checkValidity()).to.be.false
        //expect($input[0].validationMessage).to.include('Insira uma parte depois de')
        const msg = $input[0].validationMessage
        expect(msg).to.match(/Please enter a part following '@'.|Insira uma parte depois de/i)
      })
      cy.location('pathname').should('equal', '/login')
    })

    it('Registrar um Novo Usuário Válido', () => {
      const primeiroNome = chance.first()
      const ultimoNome = chance.last()
      const nome = primeiroNome + " " + ultimoNome
      const email = chance.email()
      const dia = chance.integer({ min: 1, max: 28 })
      const mes = chance.integer({ min: 1, max: 12 })
      const ano = chance.year({ min: 1900, max: 2000 })
      const empresa = chance.company()
      const endereco = chance.address()
      const state = chance.state()
      const city = chance.city()
      const zipcode = chance.zip()
      const phone = chance.phone()
      cy.get('#header a[href="/login"]').click()

      cy.get('[data-qa="signup-name"]').type(nome)
      cy.get('[data-qa="signup-email"]').type(email)
      cy.get('[data-qa="signup-button"]').click()
      cy.get('#id_gender1').check()
      cy.get('[data-qa="name"]').should('have.value', nome)
      cy.get('[data-qa="email"]').should('have.value', email)
      cy.get('[data-qa="password"]').type('123456789', { log: false })
      cy.get('[data-qa="days"]').select(dia)
      cy.get('[data-qa="months"]').select(mes)
      cy.get('[data-qa="years"]').select(ano)
      cy.get('[name="newsletter"]').check()
      cy.get('[name="optin"]').check()
      cy.get('[data-qa="first_name"]').type(primeiroNome)
      cy.get('[data-qa="last_name"]').type(ultimoNome)
      cy.get('[data-qa="company"]').type(empresa)
      cy.get('[data-qa="address"]').type(endereco)
      cy.get('[data-qa="country"]').select('United States')
      cy.get('[data-qa="state"]').type(state)
      cy.get('[data-qa="city"]').type(city)
      cy.get('[data-qa="zipcode"]').type(zipcode)
      cy.get('[data-qa="mobile_number"]').type(phone)
      cy.get('[data-qa="create-account"]').click()

      cy.get('[data-qa="account-created"] b').should('have.text', 'Account Created!')
      cy.get('#form p:nth-child(2)').should('have.text', 'Congratulations! Your new account has been successfully created!')
      cy.get('#form p:nth-child(3)').should('have.text', 'You can now take advantage of member privileges to enhance your online shopping experience with us.')
    })
  })

  context('Login', () => {
    it('Deve permanecer na mesma página ao submeter o formulário sem o Email e Senha', () => {
      cy.get('#header a[href="/login"]').click()

      cy.get('[data-qa="login-button"]').click()

      cy.location('pathname').should('equal', '/login')
      cy.get('#form div.signup-form h2').should('have.text', 'New User Signup!')
    })

    it('Deve permanecer na mesma página ao submeter o formulário sem a Senha', () => {
      cy.get('#header a[href="/login"]').click()


      cy.get('[data-qa="login-email"]').type("teste@teste.com")
      cy.get('[data-qa="login-button"]').click()

      cy.location('pathname').should('equal', '/login')
      cy.get('#form div.signup-form h2').should('have.text', 'New User Signup!')
    })

    it('Deve permanecer na mesma página ao submeter o formulário com Senha e/ou Usuário inválido', () => {
      cy.get('#header a[href="/login"]').click()

      cy.get('[data-qa="login-email"]').type("teste@teste.com")
      cy.get('[data-qa="login-password"]').type(chance.integer())
      cy.get('[data-qa="login-button"]').click()

      cy.location('pathname').should('equal', '/login')
      cy.get('#form div.signup-form h2').should('have.text', 'New User Signup!')
    })

    it.skip('Verificar campos não preenchidos e com valores inválidos - em manutenção', () => {
      cy.get('#header a[href="/login"]').click()
      cy.get('[data-qa="login-button"]').click()
      cy.get('[data-qa="login-email"]').then(($input) => {
        expect($input[0].checkValidity()).to.be.false
        //expect($input[0].validationMessage).to.include('Preencha este campo.')
        const msg = $input[0].validationMessage
        expect(msg).to.match(/Please fill out this field|Preencha este campo/i)
      })

      cy.get('[data-qa="login-email"]').type("teste")
      cy.get('[data-qa="login-button"]').click()
      cy.get('[data-qa="login-email"]').then(($input) => {
        expect($input[0].checkValidity()).to.be.false
        //expect($input[0].validationMessage).to.include('Inclua um "@" no endereço de e-mail')
        const msg = $input[0].validationMessage
        expect(msg).to.match(/Please include an '@' in the email address|Inclua um "@" no endereço de e-mail/i)
      })
      cy.get('[data-qa="login-email"]').clear().type("teste@")
      cy.get('[data-qa="login-button"]').click()
      cy.get('[data-qa="login-email"]').then(($input) => {
        expect($input[0].checkValidity()).to.be.false
        //expect($input[0].validationMessage).to.include('Insira uma parte depois de')
        const msg = $input[0].validationMessage
        expect(msg).to.match(/Please enter a part following '@'.|Insira uma parte depois de/i)
      })

      cy.fixture('usuarios').then((data) => {
        const usuario = data.usuarios[0]
        cy.get('[data-qa="login-email"]').clear().type(usuario.email)
        cy.get('[data-qa="login-button"]').click()
        cy.get('[data-qa="login-password"]').then(($input) => {
          expect($input[0].checkValidity()).to.be.false
          //expect($input[0].validationMessage).to.eq('Preencha este campo.')
          const msg = $input[0].validationMessage
          expect(msg).to.match(/Please fill out this field|Preencha este campo/i)
        })
        cy.get('[data-qa="login-password"]').type(chance.integer())
        cy.get('[data-qa="login-button"]').click()
      })
    })

    it('Realizar Login com um Usuário Válido', () => {
      cy.get('#header a[href="/login"]').click()

      cy.fixture('usuarios').then((data) => {
        const usuario = data.usuarios[0]
        cy.get('[data-qa="login-email"]').type(usuario.email)
        cy.get('[data-qa="login-password"]').type(usuario.senha, { log: false })
        cy.get('[data-qa="login-button"]').click()
        cy.get('#header li:nth-child(10) a').should('have.text', ' Logged in as ' + usuario.nome)
      })

      cy.get('#header a[href="/logout"]').should('have.text', ' Logout')
    })

    it('Logout', () => {
      cy.get('#header a[href="/login"]').click()
      cy.fixture('usuarios').then((data) => {
        const usuario = data.usuarios[0]
        cy.login(usuario.email, usuario.senha)
      })
      cy.visit('/')

      cy.get('#header a[href="/logout"]').click()

      cy.get('#form div.login-form h2').should('have.text', 'Login to your account')
      cy.location('pathname').should('equal', '/login')
    })
  })

  context('Compras', () => {
    it('Comprar', () => {
      cy.get('#header a[href="/login"]').click()
      cy.fixture('usuarios').then((data) => {
        const usuario = data.usuarios[0]
        cy.login(usuario.email, usuario.senha)
      })
      cy.visit('/', {
        onBeforeLoad: (contentWindow) => {
          contentWindow.performance.mark('inicio')
        },
        onLoad: (contentWindow) => {
          contentWindow.performance.mark('fim')
          contentWindow.performance.measure('carregamentoDaPagina', 'inicio', 'fim')
        }
      }).then((win) => {
        const tempoDeCarregamento = win.performance.getEntriesByName('carregamentoDaPagina')[0].duration
        cy.log(`Tempo de Carregamento: ${tempoDeCarregamento}`)
        console.log(`Tempo de Carregamento: ${tempoDeCarregamento}`)

      })
      cy.get('a[href="/product_details/1"]').click()
      cy.get('button.cart').click()
      cy.get('#cartModal u').click()

      cy.get('#product-1 a[href="/product_details/1"]').should('be.visible')
    })
  })
})

