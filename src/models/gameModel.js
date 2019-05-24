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

const mongoose = require('mongoose');

var gameSchema = mongoose.Schema({
  chat_id : {
    type: Number,
    required: [true, 'Missing chat ID!']
  },

  admin : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: [true, 'No admin specified!']
  }

  player_list : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      required: false
    }
  ],

  card_packs : [
    {
      type: String,
      required: false
    }
  ]

  game_active : {
    type: Boolean,
    required: [true, 'Game state not specified!']
    default: true
  }
});

module.exports = mongoose.model('Game', gameSchema);