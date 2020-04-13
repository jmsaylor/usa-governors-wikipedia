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
  let results = [];
  for (let x = 2; x < dom.querySelector("table").rows.length; x++) {
    let state = dom.querySelector("table").rows.item(x).cells.item(0)
      .textContent;
    let governor = dom.querySelector("table").rows.item(x).cells.item(2)
      .textContent;
    state = clean(state).trim();
    governor = clean(governor).trim();
    results.push([state, governor]);
  }
  return results;
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

function clean(pre) {
  return pre.replace(/[^a-z0-9]/gim, " ").replace(/\s+/g, " ");
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
