var error = function (err, response, body) {
  console.log("ERROR [%s]", err);
};
var success = function (data) {
  console.log("Data [%s]", data);
};

var Twitter = require("twitter-node-client").Twitter;

var twitter = new Twitter();

// const tweets = twitter.getUserTimeline(
//   { screen_name: "jmsaylor", count: "10" },
//   error,
//   success
// );

// const haiku = twitter.getSearch({ q: "#haiku", count: 10 }, error, success);

// console.log(twitter);
