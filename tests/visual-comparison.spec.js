// const playwright = require("playwright");
const { it, expect, describe, test } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Read port from temp file created by setup process.
// TODO: Find a better way to do this!

// const port = fs.readFileSync(path.resolve(os.tmpdir(), 'visual-comparison-test'), { encoding: 'ascii' });
const port = 8000;

const files = fs.readdirSync(__dirname + '/public/test_files/');
for (const file in files) {
  test('comparing ' + file.toString() + " " + 'with lottie-web', async ({ page, browserName }) => {
    // open page with a test lottie file
    await page.goto(`http://localhost:${port}?src=test_files/${files[file]}`, {
      waitUntil: 'networkidle',
    });

    // get a handle on the elements
    const jlottieElem = await page.$('#jlottie-container');
    const lottiewebElem = await page.$('#lottieweb-container');

    // take the screen shots for comparison
    const jlottieScreenshot = await jlottieElem.screenshot();
    const lottiewebScreenshot = await lottiewebElem.screenshot();

    expect(lottiewebScreenshot).toMatchSnapshot(`${file}.lw.png`, {
      threshold: 0.5,
    });

    expect(jlottieScreenshot).toMatchSnapshot(`${file}.lw.png`, {
      threshold: 0.5,
    });
  });
}
