// const playwright = require("playwright");
import { it, expect, describe } from '@playwright/test';

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
const files = fs.readdirSync('public/test_files/');
for (const file in files) {
  it('compares element screenshot', async ({ page, browserName }) => {
    // get all test files

    // open page with a test lottie file
    await page.goto(`http://localhost:8000?src=test_files/${files[file]}`, {
      waitUntil: 'domcontentloaded',
    });

    // get a handle on the elements
    const lf_handle = await page.$('.lottiefiles_player_container');
    const web_handle = await page.$('#web_player');

    // waiting for player to load before taking screenshots
    setTimeout(() => {}, 3000);

    // take the screen shots for comparison
    const lf_screenie = await lf_handle.screenshot();
    const web_screenie = await web_handle.screenshot();

    // On first execution, this will generate golden snapshots. Subsequent runs will compare against the golden snapshots.
    if (fs.existsSync('./__snapshots__')) {
      expect(lf_screenie).toMatchSnapshot(`${file}_hn_sc.png`, {
        threshold: 0.5,
      });
    } else {
      expect(web_screenie).toMatchSnapshot(`${file}_hn_sc.png`, {
        threshold: 0.5,
      });
    }
  });
}
