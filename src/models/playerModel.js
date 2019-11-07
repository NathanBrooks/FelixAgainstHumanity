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

const mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
  player_id : {
    type: Number,
    required: [true, 'Missing User ID!']
  }

  hands : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hand',
    required: false
  }

});

module.exports = mongoose.model('Player', playerSchema);