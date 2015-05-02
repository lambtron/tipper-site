
/**
 * Module dependencies.
 */

var analytics = require('./analytics');
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
  var venmo = yield Venmo.auth(qs.code);
  if (venmo.error) return this.body = venmo.error;
  venmo.twitter = username;
  var user = yield User.create(twitterId, venmo);
  analytics.track({ userId: user.twitterId, event: 'Signed Up' });
  return this.body = yield render('success', { user: user });
};
