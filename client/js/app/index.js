/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';
import Button from '../button/index.js';
import Input from '../input/index.js';
import List from '../list/index.js';

/**
 * Constants.
 */

const request = require('superagent');

/**
 * Define `App`.
 */

var App = component();

/**
 * Export `App`.
 */

export default App;

/**
 * After mount.
 */

App.prototype.afterMount = function(el, props, state) {
  var setState = this.setState.bind(this);
  var url = '/api/recent';

  // Sort by date
  function sortByDate(a, b) {
    return a.createdAt > b.createdAt ? -1 : 1;
  }

  request.get(url).end(function(err, res) {
    var list = res.body || [];
    setState({ list: list.sort(sortByDate) });
  });
};

/**
 * Render `App`.
 */

App.prototype.render = function(props, state) {
  var self = this;
  var twitter = '';
  var clientId = '2499';
  var venmo = 'https://api.venmo.com/v1/oauth/authorize';
  venmo += '?client_id=' + clientId;
  venmo += '&scope=make_payments%20access_profile%20access_email%20access_phone';
  venmo += '&response_type=code';
  venmo += '&state=';
  var list = state.list || [];

  // Get twitter.
  function value(value, name) {
    twitter = value;
  }

  // Redirect to stripe oauth.
  function auth() {
    if (twitter.length === 0) return;
    window.location = venmo + twitter;
  }

  return (
    <div class='container' style='width: 460px'>
      <img src='http://i.imgur.com/59wAbva.gif' class='center-block' style='width: 40px; margin: 0 auto; margin-top: 50px' />
      <div style='text-align: center; font-size: 4em; margin-top: 10px'>
        #chipper
      </div>
      <div style='text-align: center; font-size: 2em; color: rgb(197, 197, 197)'>
        Tweet Money Live.
      </div>
      <br />
      <div style='width: 100%; margin: 0 auto'>
        <div class="col-sm-6">
          <Input name='twitter' placeholder='your twitter' onValid={value} />
        </div>
        <div class="col-sm-6">
          <div class='btn btn-primary' style='cursor: pointer' onClick={auth} >
            Authenticate your Venmo
          </div>
        </div>
      </div>
      <br />
      <br />
      <List title='Recent transactions' list={list} />
      <footer style='margin-top: 400px; font-size: 0.8em; color: #B3B3B3; text-align: center;'>
        2015 - Powered by Venmo, Twitter, and Beer
      </footer>
    </div>
  );
};
