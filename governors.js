const puppeteer = require("puppeteer");

async function grabHTML(url) {
  const fetch = require("node-fetch");

  let response = await fetch(url);

  return response.text();
}

async function display() {
  const { JSDOM } = require("jsdom");
  try {
    let html = await grabHTML(
      "https://en.wikipedia.org/wiki/List_of_United_States_governors"
    );

    // console.log(html);

    const dom = await new JSDOM(html);

    console.log(await dom.window.document.querySelector("table").textContent);
  } catch (error) {
    console.error(error);
  }
}

display();
// (async () => {
//   const browser = await puppeteer.launch({
//     headless: true,
//   });
//   const page = await browser.newPage();
//   // await page.setRequestInterception(true);
//   await page.goto(
//     "https://en.wikipedia.org/wiki/List_of_United_States_governors"
//   );

//   const result = await page.$("tr");

//   console.log(result);
// })();
