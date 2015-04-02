
/**
 * Module dependencies.
 */

var thunkify = require('thunkify-wrap');
var request = require('request');
var ini = require('ini');
var fs = require('fs');
var Venmo = {};

/**
 * Const.
 */

const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
const post = thunkify(request.post.bind(request));
const uri = 'https://api.venmo.com/v1/oauth/access_token';
const load = {
  client_id: config.VENMO_CLIENT_ID,
  client_secret: config.VENMO_CLIENT_SECRET
};

/**
 * Expose `Venmo`.
 */

module.exports = Venmo;

/**
 * Retrieve users info.
 */

Venmo.auth = function *(code) {
  load.code = code;
  var res = yield post(uri, { form: load });
  var body = JSON.parse(res[0].body);
  if (body.error) return body;
  return fmt(body);
};

/**
 * Format response.
 */

function fmt(venmo) {
  return {
    accessToken: venmo.access_token,
    refreshToken: venmo.refresh_token,
    phone: venmo.user.phone,
    email: venmo.user.email
  }
}
