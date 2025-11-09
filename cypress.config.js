/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const { defineConfig } = require("cypress");

const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const { pa11y } = require("@cypress-audit/pa11y");

const fs = require('fs');
const path = require('path');


module.exports = defineConfig({
  video: true,
  viewportWidth: 1366,
  viewportHeight: 768,
  chromeWebSecurity: false,
  defaultCommandTimeout: 120000,
  responseTimeout: 120000,
  requestTimeout: 120000,
  retries: {
    runMode: 1,
    openMode: 1,
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/report/mochawesome-report',
    overwrite: true,
    html: true,
    json: false,
    timestamp: 'mmddyyyy_HHMMss',
    cdn: true,
    charts: true,
  },
  projectId: "vnha34",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // Necessário para preparar o browser para o Lighthouse
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      // Gatilho para o comando lighthouse
      on("task", {
        lighthouse: lighthouse(),
        pa11y: pa11y(console.log.bind(console)), // ver o que faz

        registroPerformance(data) {
          const dirPath = path.join(__dirname, 'metrics');
          const filePath = path.join(dirPath, 'performance-metrics.json');

          // Cria a pasta caso não exista
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
          }

          // Se o arquivo não existir, cria com array vazio
          let historico = [];
          if (fs.existsSync(filePath)) {
            historico = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          }

          historico.push(data);

          fs.writeFileSync(filePath, JSON.stringify(historico, null, 2), 'utf8');

          return null; // obrigatório para tasks
        }
      }
      )
      return config
    },
    baseUrl: 'https://automationexercise.com/',
    video: false,
    defaultCommandTimeout: 60000,

    env: {
      "nome": "Teste",
      "email": "teste2@teste365.com",
      "senha": "123456789",
      "api_verificar_login": "https://automationexercise.com/api/verifyLogin",
      "requestMode": true
    }
  },
});
