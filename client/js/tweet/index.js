/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';

/**
 * Define `Tweet`.
 */

var Tweet = component()
  .prop('sender', { type: 'string' })
  .prop('senderImg', { type: 'string' })
  .prop('text', { type: 'string' })
  .prop('url', { type: 'string' })
  .prop('createdAt', { type: 'date' });

/**
 * Expose `Tweet`.
 */

export default Tweet;

/**
 * Render `text`.
 */

Tweet.prototype.render = function(props, state) {
  var sender = props.sender || '';
  var senderImg = props.senderImg || '';
  var text = props.text || '';
  var url = props.url || '';
  var createdAt = props.createdAt || '';

  return (
    <div style='cursor: pointer'>
      <hr />
      <a href={url}>
        <img src={senderImg} alt={sender} style='height: 50px; width: 50px; margin-right: 10px; border-radius: 25px; -moz-border-radius: 25px; -webkit-border-radius: 25px' />
        <span style='position: absolute; font-size: 0.8em; color: #A8A8A8'>@{sender}</span>
        <div class='pull-right' style='display: inline-block; margin-top: 18px; width: 340px'>{text}</div>
      </a>
    </div>
  );
};
