
/**
 * Module dependencies.
 */

var twitter = require('./twitter');
var render = require('./render');
var Venmo = require('./venmo');
var User = require('./user');

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
  var username = qs.state;
  var twitterId = yield twitter.getId(username);
  var venmo = yield Venmo.auth(qs.access_token);
  console.log(venmo);
  if (venmo.error) return this.body = venmo.error;
  return this.body = yield User.create(twitterId, venmo);
};
