/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';
import Button from '../button/index.js';
import Input from '../input/index.js';

/**
 * Define `App`.
 */

var App = component();

/**
 * Export `App`.
 */

export default App;

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
  venmo += '&state=';

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
    <div class='container' style='width: 500px'>
      <div style='text-align: center; font-size: 2em; margin-top: 100px'>
        Meerkash
      </div>
      <br />
      <div>
        <pre>@andyjiang $20 for the turkey sandwich thanks</pre>
      </div>
      <br />
      <div style='width: 190px; margin: 0 auto'>
        <Input name='twitter' placeholder='your_twitter' onValid={value} />
        <br /><br />
        <div style='cursor: pointer' onClick={auth}>
          HELLO HELLO
        </div>
      </div>
    </div>
  );
};
