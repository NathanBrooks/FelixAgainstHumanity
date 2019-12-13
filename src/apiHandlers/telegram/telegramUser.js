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

const TelegramMessageRequest = require('./TelegramMessageRequest');

class TelegramUser {
    constructor(userID) {
        this.userID = userID;
        this.messageQueue = [];
        this.currentMessage = null;

        // database stuff to fill this all back in

        this.update();
    }

    initialize() {
        return new Promise((accept, reject) => {
            accept();
        });
    }

    addSimpleMessage(fromID, message) {
        let newMessage = new TelegramMessageRequest(
            TelegramMessageRequest.requestTypes.SimpleMessage,
            this.userID, fromID, message, null);

        this.messageQueue.push(newMessage);
        this.update();
    }

    update() {
        if(this.messageQueue.length > 0) {
            console.log("message queue for " + this.userID + " is:");
            for(let key in this.messageQueue) {
                console.log(this.messageQueue[key].message);
            }
        }
    }
}

module.exports = TelegramUser;
