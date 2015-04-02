
/**
 * Module dependencies.
 */

var thunkify = require('thunkify-wrap');
var Twitter = require('twitter');
var ini = require('ini');
var fs = require('fs');

/**
 * Static variables.
 */

var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'))

/**
 * Set credentials.
 */

var twitter = new Twitter({
  consumer_key: config.TW_CONSUMER_KEY,
  consumer_secret: config.TW_CONSUMER_SEC,
  access_token_key: config.TW_ACCESS_TOKEN_KEY,
  access_token_secret: config.TW_ACCESS_TOKEN_SEC
});

/**
 * Thunked get.
 */

var get = thunkify(twitter.get.bind(twitter));

/**
 * Expose `twitter`.
 */

module.exports = twitter;

/**
 * Look up twitterId from username.
 */

twitter.getId = function *(username) {
  console.log(username);
  var res = yield get('users/show', { screen_name: username, include_entities: false });
  console.log(res);
  return res[0].id;
};
