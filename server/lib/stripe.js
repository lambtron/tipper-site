
/**
 * Module dependencies.
 */

var thunkify = require('thunkify-wrap');
var request = require('request');
var ini = require('ini');
var fs = require('fs');
var Stripe = {};

/**
 * Const.
 */

const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

/**
 * Expose `Stripe`.
 */

module.exports = Stripe;

/**
 * Retrieve users info.
 */

Stripe.auth = function *(code) {
  var post = thunkify(request.post.bind(request));
  var uri = 'https://connect.stripe.com/oauth/token';
  var load = {
    grant_type: 'authorization_code',
    client_id: config.STRIPE_DEV_CLIENT_ID,
    code: code,
    client_secret: config.STRIPE_TEST_SECRET_KEY
  };
  var res = yield post(uri, { form: load });
  var tokens = JSON.parse(res[0].body);
  return tokens;
};

/**
 * Format response.
 */

function fmt() {
}
