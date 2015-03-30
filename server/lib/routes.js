
/**
 * Module dependencies.
 */

var render = require('./render');
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
  var load = this.request.body;
  return this.body = yield User.create(load.user);
};
