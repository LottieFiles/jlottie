const path = require('path');
const {
  ChromiumEnv,
  FirefoxEnv,
  WebKitEnv,
  test,
  setConfig,
} = require('@playwright/test');

setConfig({
  testDir: path.resolve(__dirname, 'tests'), // Search for tests in this directory.
  timeout: 30000, // Each test is given 30 seconds.
});

const options = {
  headless: false,
  viewport: { width: 1280, height: 720 },
};

// Run tests in three browsers.
test.runWith(new ChromiumEnv(options), { tag: 'chromium' });
test.runWith(new FirefoxEnv(options), { tag: 'firefox' });
test.runWith(new WebKitEnv(options), { tag: 'webkit' });
