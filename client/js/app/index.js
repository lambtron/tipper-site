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
  var clientId = 'ca_5xs5jQYK3Jm0RokxGd33Z2LD9Xh79xOF';
  var stripe = 'https://connect.stripe.com/oauth/authorize?response_type=code';
  stripe += '&client_id=' + clientId + '&scope=read_write&state=';

  // Get twitter.
  function value(value, name) {
    twitter = value;
  }

  // Redirect to stripe oauth.
  function auth() {
    if (twitter.length === 0) return;
    window.location = stripe + twitter;
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
        <img src='../../img/stripe.png' style='cursor: pointer' onClick={auth} />
      </div>
    </div>
  );
};
