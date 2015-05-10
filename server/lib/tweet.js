
/**
 * Module dependencies.
 */

var db = require('./db');
var wrap = require('co-monk');
var Tweet = wrap(db.get('tweet'));

/**
 * Expose `Tweet`.
 */

module.exports = Tweet;
