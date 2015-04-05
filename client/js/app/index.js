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
  venmo += '&response_type=code';
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
    <div class='container' style='width: 320px'>
      <img src='http://i.imgur.com/59wAbva.gif' class='center-block' style='width: 40px; margin: 0 auto; margin-top: 50px' />
      <div style='text-align: center; font-size: 2em; margin-top: 30px'>
        Tipper
      </div>
      <br />
      <blockquote>
        Pay or receive a small amount with just a tweet.
      </blockquote>
      <br />
      <div>
        <ol style='margin-left: -40px'>
          <li style='margin-bottom: 10px'>Authenticate your Venmo account with your Twitter username.</li>
          <li style='margin-bottom: 10px'>Tipper will listen for your tweets where you <code>@</code> someone, have a <code>$</code>,
          and the hashtag <code>#tipper</code>.</li>
          <li style='margin-bottom: 10px'>If the above conditions are met, we'll take the $ from your Venmo
          account and send it to the recipient's Venmo account. If recipient has not authed her Venmo with us, the
          payment will not be processed.</li>
          <li style='margin-bottom: 10px'>Similarly, if there is a tweet at you with <code>#tipper</code> and a <code>$</code>,
          then your Venmo will get paid :).</li>
          <li style='margin-bottom: 10px'>Max payment is $20! If you mention multiple
          people on the tweet, they will all get paid the amount you specified.</li>
        </ol>
      </div>
      <br />
      <hr />
      <div style='text-align: center; font-size: 1.6em; margin-top: 20px'>
        Get started
      </div>
      <br />
      <div style='width: 190px; margin: 0 auto'>
        <Input name='twitter' placeholder='your twitter handle (required)' onValid={value} />
        <br /><br />
        <div class='btn btn-primary' style='cursor: pointer' onClick={auth} >
          Authenticate your Venmo
        </div>
      </div>
      <br />
      <br />
      <footer style='margin-top: 50px; font-size: 0.8em; color: #B3B3B3; text-align: center;'>
        2015 - Powered by Venmo, Twitter, and Beer
      </footer>
    </div>
  );
};
