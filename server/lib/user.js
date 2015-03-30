
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
 *
 * - twitter handle
 * - stripe accessToken
 * - stripe requestToken
 * - paid
 * - received
 * - createdAt
 */

User.create = function *(user) {
  var exists = yield this.findOne({ name: user.name });
  if (!exists) return yield this.insert(newUser(user));
  return yield this.updateById(exists._id, exists);
};

/**
 * New user
 */

function newUser(user) {
  return {
    twitter: user.twitter,
    stripeAccessToken: user.stripeAccessToken,
    stripeRequestToken: user.stripeRequestToken,
    paid: 0,
    received: 0,
    createdAt: Date()
  };
}

/**
 * Merge two users, keep some stuff.
 */

function merge(user, exists) {
  return {
    twitter: user.twitter || exists.twitter,
    stripeAccessToken: user.stripeAccessToken || exists.stripeAccessToken,
    stripeRequestToken: user.stripeRequestToken || exists.stripeRequestToken,
    paid: exists.paid,
    received: exists.received,
    createdAt: exists.createdAt
  };
}
