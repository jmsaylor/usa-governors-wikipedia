const puppeteer = require("puppeteer");

async function grabHTML(url) {
  const fetch = require("node-fetch");

  let response = await fetch(url);

  return response.text();
}

async function scrape() {
  const { JSDOM } = require("jsdom");
  try {
    let html = await grabHTML(
      "https://en.wikipedia.org/wiki/List_of_United_States_governors"
    );

    // console.log(html);

    const dom = await new JSDOM(html);

    return dom.window.document.querySelector("table").textContent;
  } catch (error) {
    console.error(error);
  }
}

async function parse() {
  let raw = await scrape();

  //some RegEx to remove the noise
  raw = raw.replace(/[^a-z0-9]/gim, " ").replace(/\s+/g, " ");

  //into a nice array
  const [...info] = raw.split(" ");

  return info;
}

display();

async function display() {
  console.log(await parse());
}

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
