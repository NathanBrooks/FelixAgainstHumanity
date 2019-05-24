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

const telegramAPI = require('../apiHandlers/telegramAPI').telegramAPI;

var gameManager = {};

function createGame(chat_id, user_id) {
  telegramAPI.sendMessageToID('You have created a game!', chat_id);
}

function deleteGame(chat_id, user_id) {
  telegramAPI.sendMessageToID('You have destroyed a game!', chat_id);
}

function joinGame(chat_id, user_id) {
  telegramAPI.sendMessageToID('You have join a game!', chat_id);
}

function leaveGame(chat_id, user_id) {
  telegramAPI.sendMessageToID('You have left a game!', chat_id);
}

function testFunc(chat_id, user_id) {
  telegramAPI.sendMessageToID('attempting to send direct message...', chat_id);
  telegramAPI.sendMessageToID('This is a test message!', user_id);
}

telegramAPI.EventManager.on('message', (message) => {
    if(message.chat.type == 'group') {
      switch(message.text.toLowerCase()){
        case '/create_game':
          createGame(message.chat.id, message.from.id);
        case '/delete_game':
          deleteGame(message.chat.id, message.from.id);
        case '/join':
          joinGame(message.chat.id, message.from.id);
          break;
        case '/leave':
          leaveGame(message.chat.id, message.from.id);
        case '/test':
          testFunc(message.chat.id, message.from.id);
        default:
      }
    }

});

module.exports = {
  gameManager : gameManager
}