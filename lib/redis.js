var redis = require("redis");
var config = require('../config');

var client = redis.createClient(config.redis_port, config.redis_host);

client.on("error", function (err) {
  console.log("Error " + err);
});

module.exports = client;
