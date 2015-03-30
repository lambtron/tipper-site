
/**
 * Module dependencies.
 */

var mongo = process.env.MONGOLAB_URI || 'mongodb://localhost/meerkash';
var monk = require('monk');

/**
 * Expose `db`.
 */

module.exports = monk(mongo);
