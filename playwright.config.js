const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  testMatch: '**/*.spec.js',
  timeout: 60000,

  expect: {
    timeout: 10000
  },

  fullyParallel: false,

  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  }
});