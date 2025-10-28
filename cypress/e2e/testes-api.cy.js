describe('Testes de API', () => {
    context('Testes em rotas com usuário autorizado', () => {
        it('Verificar se usuário é valido', () => {
            cy.request({
                method: 'POST',
                url: Cypress.env('api_verificar_login'),
                form: true,
                body: {
                    email: Cypress.env('email'),
                    password: Cypress.env('senha')
                }
            }).then(response => {
                expect(response.status).to.eq(200);
                let body = typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body
                expect(body.message).to.eq('User exists!')
            })
        })
    })
    context('Testes em rotas com usuário não autorizado', () => {
        it('Verificar se usuário não é valido', () => {
            cy.request({
                method: 'POST',
                url: Cypress.env('api_verificar_login'),
                form: true,
                body: {
                    email: "teste",
                    password: "teste"
                }
            }).then(response => {
                expect(response.status).to.eq(200);
                let body = typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body
                expect(body.message).to.eq('User not found!')
            })
        })
    })
})