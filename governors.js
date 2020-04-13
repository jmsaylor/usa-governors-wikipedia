const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");

async function grabHTML(url) {
  let response = await fetch(url);
  return response.text();
}

async function getDOM() {
  try {
    let html = await grabHTML(
      "https://en.wikipedia.org/wiki/List_of_United_States_governors"
    );
    const dom = await new JSDOM(html);
    return dom.window.document;
  } catch (error) {
    console.error(error);
  }
}

function searchDOM(dom) {
  return dom.querySelector("table").textContent;
}

display();

async function display() {
  let dom = await getDOM();
  dom = searchDOM(dom);

  console.log(dom);
}

async function arraify(raw) {
  //some RegEx to remove the noise
  raw = raw.replace(/[^a-z0-9]/gim, " ").replace(/\s+/g, " ");

  //into a nice array
  const [...info] = raw.split(" ");

  return info;
}

function dumbParser(arr) {
  const data = [];

  for (let x = 0; x < arr.length; x++) {
    if (x % 19 == 0) {
      data.push(arr[x]);
    }
  }
}

// (async () => {
// const puppeteer = require("puppeteer");
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
