// const playwright = require("playwright");
const { it, expect, describe } = require('@playwright/test');
const fs = require('fs');

// (async () => {
//   const browser = await playwright.chromium.launch({ headless: false });
//   const page = await browser.newPage();

//   var files = fs.readdirSync("public/test_files/");

//   await page.goto("http://localhost:8000?src=" + files[0]);

//   // test case 1 : check if lottie is rendered :
//   // check if svg element is inside of the lottie element

//   // test case 2 : check if positioning works : check if library threw errors :
//   // cannot read length of undefined is likely a positioning error

//   // test case 3 : success on first two cases but visually check against lottie web player.

//   // await browser.close();
// })();
const files = fs.readdirSync(__dirname + '/public/test_files/');
for (const file in files) {
  it('compares with lottie-web', async ({ page, browserName }) => {
    // get all test files

    // open page with a test lottie file
    await page.goto(`http://localhost:8000?src=test_files/${files[file]}`, {
      waitUntil: 'domcontentloaded',
    });

    // get a handle on the elements
    const jlottieElem = await page.$('#jlottie-container');
    const lottiewebElem = await page.$('#lottieweb-container');

    // waiting for player to load before taking screenshots
    setTimeout(() => {}, 3000);

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
