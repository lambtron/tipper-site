
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
