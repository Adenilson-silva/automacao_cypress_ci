describe('testes em API', () => {
    context('Testes em rotas com usuário autorizado', () => {
        beforeEach(() => {
            cy.VerificarLoginApi(Cypress.env('email'), Cypress.env('senha'));
        })
        it('Teste', () => {
            cy.request('GET', '/').should((response) => {
                expect(response.status).to.eq(200);
            })
        })
    })
})