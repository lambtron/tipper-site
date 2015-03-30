
/**
 * Module dependencies.
 */

var db = require('./db');
var wrap = require('co-monk');
var User = wrap(db.get('user'));

/**
 * Expose `User`.
 */

module.exports = User;

/**
 * Upsert user.
 */

User.create = function *(user) {
  var exists = yield this.findOne({ name: user.name });
  if (!exists) return yield this.insert(user);
  return 'User already exists';
};
