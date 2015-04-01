
/**
 * Module dependencies.
 */

var thunkify = require('thunkify-wrap');
var Twitter = require('twitter');
var ini = require('ini');
var fs = require('fs');
var co = require('co');

/**
 * Static variables.
 */

var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'))
var twitter = thunkify(new Twitter({
  consumer_key: config.TW_CONSUMER_KEY,
  consumer_secret: config.TW_CONSUMER_SEC,
  access_token_key: config.TW_ACCESS_TOKEN_KEY,
  access_token_secret: config.TW_ACCESS_TOKEN_SEC
}));
// var get = thunkify(twitter.get.bind(twitter));

/**
 * Test
 */

// co(function*() {
//   var username = 'andyjiang';
//   var res = yield twitterget('users/show', { screen_name: username, include_entities: false });
//   console.log(res);
// });


twitter.get('users/show', { screen_name: 'andyjiang' })(function(err, res) {
  console.log(err);
  console.log(res);
});