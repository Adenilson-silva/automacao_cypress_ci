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
  e2e: {
    baseUrl: 'https://automationexercise.com/',
    defaultCommandTimeout: 60000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
