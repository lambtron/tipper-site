
/**
 * Module dependencies.
 */

var render = require('./render');
var User = require('./user');
var Stripe = require('./stripe');

/**
 * Render index html page.
 */

exports.index = function *() {
  return this.body = yield render('index');
};

/**
 * Register.
 */

exports.register = function *() {
  var qs = this.request.query;
  var twitter = qs.state;
  if (qs.error) return this.body = qs.error_description;
  var tokens = yield Stripe.auth(qs.code);
  if (tokens.error) return this.body = tokens.error_description;
  return this.body = yield User.create(twitter, tokens);
};
