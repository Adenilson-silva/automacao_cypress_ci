/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const { defineConfig } = require("cypress");

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
    },
    baseUrl: 'https://automationexercise.com/',
    video: false,
    defaultCommandTimeout: 60000,
  },
});
