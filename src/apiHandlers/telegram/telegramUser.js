/*
 * Copyright 2019 Nathan Tyler Brooks
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

const TelegramAPI = require('./telegramAPI');
const TelegramAPIHandler = require('./telegramAPI').TelegramAPIHandler;
const TelegramMessageRequest = require('./structures/telegramMessageRequest');

class TelegramUser {
    constructor(userID) {
        this.userID = userID;                                                   // the telegram ID of this user
        this.messageQueue = [];                                                 // queue of TelegramMessageRequest objects
        this.currentMessage = null;                                             // the current message waiting for a response or being processed

        // database stuff to fill this all back in

        this.update();                                                          // update the object state
    }

    initialize() {
        return new Promise((resolve, reject) => {
            TelegramAPIHandler.checkForPrivateChat(this.userID)
                .then(() => {
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    addSimpleMessage(fromID, message) {
        let newMessage = new TelegramMessageRequest(                            // create new message object
            TelegramMessageRequest.requestTypes.SimpleMessage,
            this.userID, fromID, message, null, null);

        this.messageQueue.push(newMessage);                                     // add it to queue
        this.update();                                                          // update the object state
    }

    addKeyboardMessage(fromID, message, payload) {
        let newMessage = new TelegramMessageRequest(                            // create new message object
            TelegramMessageRequest.requestTypes.KeyboardMessage,
            this.userID, fromID, message, payload, callback);

        this.messageQueue.push(newMessage);                                     // add it to queue
        this.update();                                                          // update object state
    }

    update() {
        if(this.currentMessage == null && this.messageQueue.length != 0) {      // if there is no message being handled and at least one message waiting...
            this.currentMessage = this.messageQueue.shift();                    // pull next message to handle
            TelegramAPIHandler.sendTelegramMessageRequest(this.currentMessage); // send the message

            if(this.currentMessage.type
                == TelegramMessageRequest.requestTypes.SimpleMessage) {         // if we are a simple message, we don't get a response and just move to the next in queue
                this.currentMessage = null;
                this.update();
            }
        }
    }
}

module.exports = TelegramUser;
