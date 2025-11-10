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
    cy.visit('/login')
    cy.get('[data-qa="login-email"]').type(email);-
    cy.get('[data-qa="login-password"]').type(senha, { log: false })
    cy.get('[data-qa="login-button"]').click()
    cy.get('#header a[href="/logout"]').should('have.text', ' Logout')
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

Cypress.Commands.add("lighthouse", (thresholds = {}) => {
  cy.task("lighthouse", {
    thresholds,
  })
})




// cypress/support/commands.js
/**
 * Monitora o tempo total de execução de um bloco de comandos e registra
 * a performance.
 *
 * @param {string} nomeDoFluxo O nome do fluxo para o registro (ex: 'cadastro_produto').
 * @param {number} inicio O timestamp (Date.now()) do início da medição.
 * @param {string} timezone O fuso horário para a formatação da data (ex: 'America/Sao_Paulo').
 */
Cypress.Commands.add('monitorarPerformance', (nomeDoFluxo, inicio, timezone = 'America/Sao_Paulo') => {
  // A execução do Cypress.Commands.add é síncrona,
  // mas 'cy.then' permite que comandos assíncronos sejam executados.
  // Usamos 'cy.then' para garantir que o código só rode após o comando anterior.
  cy.then(() => {
    const fim = Date.now();
    const tempoTotal = fim - inicio;

    // 1. Obtém a data/hora exata no fuso horário especificado
    const dataHoraFormatada = new Date(fim).toLocaleString('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // Garante o formato 24 horas
    });

    // 2. Converte para o formato AAAA-MM-DDTHH:MM:SS (Ideal para Power BI)
    const dataFormatadaPowerBI = dataHoraFormatada.replace(', ', 'T');

    cy.log(`⏱ Tempo total do fluxo **${nomeDoFluxo}**: **${tempoTotal} ms**`);
    cy.log(`📅 Fim do teste (Power BI - ${timezone}): **${dataFormatadaPowerBI}**`);

    // Envia os dados para a Task
    cy.task('registroPerformance', {
      "fluxo": nomeDoFluxo,
      'tempoTotal(ms)': tempoTotal,
      data: dataFormatadaPowerBI // Formato AAAA-MM-DDTHH:MM:SS
    });
  });
});