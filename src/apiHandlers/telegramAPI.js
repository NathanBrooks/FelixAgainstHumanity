/*
 * Copyright 2018 Nathan Tyler Brooks
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const telegramBotApi = require('telegram-bot-api');
const events = require('events');

var telegram = new telegramBotApi({
  token: process.env.TELEGRAM_API_KEY,
  updates: {
    enabled: true,
  },
});

var telegramAPI = {}

telegramAPI.KeyboardButton = class {
  constructor(text) {
    this.text = text;
  }
}

telegramAPI.ReplyKeyboardMarkup = class {
  constructor(keyboardItems) {
    this.keyboard = [];
    for(var key in keyboardItems) {
      this.keyboard.push([new telegramAPI.KeyboardButton(keyboardItems[key])]);
    }
  }
}

telegramAPI.sendMessage = (text, message) => {
    if (text.split(/\s/) <= 1) {
      telegram.sendMessage({
            chat_id: message.chat.id,
            text: '<empty message>',
      });
    } else {
      var i = 0;
      while (i != text.length) {
        var tmp = i;
        i = Math.min(i + 4096, text.length);
        telegram.sendMessage({
            chat_id: message.chat.id,
            text: text.substring(tmp, i),
        });
      }
    }
}

telegramAPI.sendMessageToUser = (text, message) => {
  if(text.split(/\s/) <= 1) {
    telegram.sendMessage({
      chat_id: message.from.id,
      text: '<empty message>',
    });
  } else {
    var i = 0;
    while (i != text.length) {
      var tmp = i;
      i = Math.min(i + 4096, text.length);
      telegram.sendMessage({
          chat_id: message.from.id,
          text: text.substring(tmp, i),
      });
    }
  }
}

telegramAPI.sendMessageToID = (text, id) => {
  if(text.split(/\s/) <= 1) {
    telegram.sendMessage({
      chat_id: id,
      text: '<empty message>',
    });
  } else {
    var i = 0;
    while (i != text.length) {
      var tmp = i;
      i = Math.min(i + 4096, text.length);
      telegram.sendMessage({
          chat_id: id,
          text: text.substring(tmp, i),
      });
    }
  }
}

telegramAPI.sendKeyboard = (keyboardItems, message) => {
  var options = {
    chat_id: message.chat.id,
    text: 'test',
    reply_to_message_id: message.id,
    reply_markup:
      JSON.stringify(new telegramAPI.ReplyKeyboardMarkup(keyboardItems))
  }

  telegram.sendMessage(options);
}

telegramAPI.EventManager = new events.EventEmitter();

telegram.on('message', (message) => {
  if(message && 'text' in message) {
    telegramAPI.EventManager.emit('message', message);
  }
})


module.exports = {
  telegramAPI : telegramAPI,
};