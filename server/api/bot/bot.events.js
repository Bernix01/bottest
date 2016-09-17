/**
 * Bot model events
 */

'use strict';

import {EventEmitter} from 'events';
import Bot from './bot.model';
var BotEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BotEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Bot.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BotEvents.emit(event + ':' + doc._id, doc);
    BotEvents.emit(event, doc);
  };
}

export default BotEvents;
