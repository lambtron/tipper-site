/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';
import Tweet from '../tweet/index.js';

/**
 * Define `List`.
 */

var List = component()
  .prop('title', { type: 'string' })
  .prop('list', { type: 'array' });

/**
 * Expose `List`.
 */

export default List;

/**
 * Render `List`.
 */

List.prototype.render = function(props, state) {
  var title = props.title || '';
  var list = props.list || [];

  // Create rows.
  var rows = list
    .map(function(item) {
      var url = 'https://twitter.com/' + item.user.screen_name + '/status/' + item.id_str;
      return (
        <Tweet
          sender={item.user.screen_name}
          senderImg={item.user.profile_image_url}
          text={item.text}
          url={url}
          createdAt={item.created_at} />
      );
    });

  // Return rows.
  return (
    <div style='margin: 40px 15px 0px 15px'>
      <div style='text-align: center; color: rgb(197, 197, 197); margin-bottom: 15px;'>
        {title}
      </div>
      {rows}
    </div>
  );
};
