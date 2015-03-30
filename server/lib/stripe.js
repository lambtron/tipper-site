
/**
 * Module dependencies.
 */

var thunkify = require('thunkify-wrap');
var request = require('request');
var Stripe = {};

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
    client_id: 'ca_5xs5jQYK3Jm0RokxGd33Z2LD9Xh79xOF',
    code: code,
    client_secret: 'sk_test_xD7F3URRZeSyQahOmvJ1zqZ0' // test secret
  };

  var res = yield post(uri, { form: load });
  var tokens = JSON.parse(res[0].body);
  return tokens;
};
