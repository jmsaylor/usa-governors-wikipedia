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

let paramsList = {
  place: { id: 1 },
  //1 is World ID
};

//  "https://api.twitter.com/1.1/search/tweets.json?q=from%3Atwitterdev&result_type=mixed&count=2";
let urls = [
  "https://api.twitter.com/1.1/search/tweets.json",
  "https://api.twitter.com/1.1/users/show.json",
  "https://api.twitter.com/1.1/statuses/home_timeline.json",
  "https://api.twitter.com/1.1/trends/place.json",
];

params = paramsList.place;

console.log(params);

const url = urls[3] + "?id=1";
console.log(url);
const method = "GET";

let headers = {
  method: method,
  headers: {
    // (httpMethod, baseUrl, reqParams)
    Authorization: authorization("GET", url),
  },
};

async function search() {
  // console.log(url);
  console.log(headers);
  try {
    let results = await fetch(url, headers);

    return results.json();
  } catch (error) {
    console.log(error);
  }
}

async function display() {
  console.log(await search());
}

display();
