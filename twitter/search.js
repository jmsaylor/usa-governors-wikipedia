const fetch = require("node-fetch");
const { authorization } = require("./authorization");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const { keys } = require("./keys");

const oauth = OAuth({
  consumer: { key: keys.consumer_key, secret: keys.consumer_secret },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

//  "https://api.twitter.com/1.1/search/tweets.json?q=from%3Atwitterdev&result_type=mixed&count=2";
const urls = [
  "https://api.twitter.com/1.1/search/tweets.json?q=from%jmsaylor&result_type=mixed&count=2",
  "https://api.twitter.com/1.1/users/show.json?screen_name=jmsaylor",
  "https://api.twitter.com/1.1/statuses/home_timeline.json",
];

const method = "GET";

const url = urls[2];

let headers = {
  method: method,
  headers: {
    // (httpMethod, baseUrl, reqParams)
    Authorization: authorization("GET", url),
  },
};

// console.log(headers);

async function search() {
  console.log(url);
  try {
    let results = await fetch(url, headers, {
      data: { screen_name: "jmsaylor" },
    });

    return results.json();
  } catch (error) {
    console.log(error);
  }
}

async function display() {
  console.log(await search());
}

display();
