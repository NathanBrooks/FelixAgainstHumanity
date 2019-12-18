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

 class TelegramMessageRequest {

    static requestTypes = Object.freeze({
        "SimpleMessage" : 1,
        "KeyboardMessage" : 2,
        "GenericMessage" : 3
    });

    constructor(type, toID, fromID, message, payload = null) {
        this.type = type;
        this.toID = toID;
        this.fromID = fromID;
        this.message = message;
        this.payload = payload;
    }
 }

 module.exports = TelegramMessageRequest;
