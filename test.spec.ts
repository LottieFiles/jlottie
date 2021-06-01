// const playwright = require("playwright");
var fs = require("fs");
import { it, expect, describe } from "@playwright/test";

// (async () => {
//   const browser = await playwright.chromium.launch({ headless: false });
//   const page = await browser.newPage();

//   var files = fs.readdirSync("public/test_files/");

//   await page.goto("http://localhost:8000?src=" + files[0]);

//   // test case 1 : check if lottie is rendered : check if svg element is inside of the lottie element

//   // test case 2 : check if positioning works : check if library threw errors :  cannot read length of undefined is likely a positioning error

//   // test case 3 : success on first two cases but visually check against hernans player.

//   // await browser.close();
// })();

it("compares element screenshot", async ({ page, browserName }) => {
  // get all test files
  var files = fs.readdirSync("public/test_files/");
  await page.goto("http://localhost:8000?src=" + files[0], {
    waitUntil: "domcontentloaded",
  });

  const lf_handle = await page.$(".lottiefiles_player_container");
  const hernan_handle = await page.$(".hernan_player_container");

  const lf_screenie = await lf_handle.screenshot({ path: "public/lf_sc.png" });
  await hernan_handle.screenshot({ path: "public/hn_sc.png" });

  expect(lf_screenie).toMatchSnapshot(`hn_sc.png`, {
    threshold: 0.2,
  });
});
