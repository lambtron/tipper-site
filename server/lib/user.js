
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
 * - stripe id
 * - paid
 * - received
 * - createdAt
 */

User.create = function *(twitter, tokens) {
  var exists = yield this.findOne({ twitter: twitter });
  var user = newUser(twitter, tokens);
  if (!exists) return yield this.insert(user);
  return yield this.updateById(exists._id, merge(user, exists));
};

/**
 * New user
 */

function newUser(twitter, tokens) {
  return {
    twitter: twitter,
    stripeAccessToken: tokens.access_token,
    stripeRequestToken: tokens.refresh_token,
    stripeId: tokens.stripe_user_id,
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
    stripeAccessToken: user.stripeAccessToken || exists.stripeAccessToken,
    stripeRequestToken: user.stripeRequestToken || exists.stripeRequestToken,
    stripeId: user.stripeId || exists.stripeId,
    paid: exists.paid,
    received: exists.received,
    createdAt: exists.createdAt
  };
}
