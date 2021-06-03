const path = require('path');
const {
  ChromiumEnv, FirefoxEnv, WebKitEnv, test,
} = require('@playwright/test');

const testsDir = path.resolve(__dirname, 'tests');

const config = {
  name: 'comparison',
  globalSetup: path.resolve(testsDir, 'setup.js'),
  testDir: testsDir, // Search for tests in this directory.
  testMatch: '*.spec.js',
  timeout: 30000, // Each test is given 30 seconds.
};

const options = {
  headless: false,
  viewport: { width: 1280, height: 720 },
};

// Run tests in three browsers.
test.runWith(new ChromiumEnv(options), { tag: 'chromium' });
test.runWith(new FirefoxEnv(options), { tag: 'firefox' });
test.runWith(new WebKitEnv(options), { tag: 'webkit' });

module.exports = config;
