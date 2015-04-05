
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
 * - twitter
 * - twitterId
 * - accessToken
 * - requestToken
 * - phone
 * - email
 * - paid
 * - received
 * - createdAt
 */

User.create = function *(twitterId, details) {
  var exists = yield this.findOne({ twitterId: twitterId });
  var user = newUser(twitterId, details);
  if (!exists) return yield this.insert(user);
  return yield this.updateById(exists._id, merge(user, exists));
};

/**
 * New user
 */

function newUser(twitterId, details) {
  return {
    twitter: details.twitter,
    twitterId: twitterId,
    accessToken: details.accessToken,
    requestToken: details.refreshToken,
    phone: details.phone,
    email: details.email,
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
    twitter: exists.twitter,
    twitterId: exists.twitterId,
    accessToken: user.accessToken || exists.accessToken,
    requestToken: user.requestToken || exists.requestToken,
    phone: user.phone || exists.email,
    email: user.email || exists.email,
    paid: exists.paid,
    received: exists.received,
    createdAt: exists.createdAt
  };
}
