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

const url = require('url');
const util = require('util');
const https = require('https');

const SEARCH_URI = 'https://api.cardcastgame.com/v1/decks?search=%s';
const CARDS_URI = 'https://api.cardcastgame.com/v1/decks/%s/cards';

function httpsGet(uri) {
  return new Promise((resolve, reject) => {
    console.log(uri);
    https.get(uri, (res) => {
      var body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        var parsedJson = {};
        try {
          parsedJson = JSON.parse(body);
        } catch(e) {
          reject(e);
        }

        resolve(parsedJson);
      });
    });
  });
}

function getDeck(deckID) => {
  return new Promise((accept, reject) => {
    var requestURI = util.format(CARDS_URI, deckID);

    httpsGet(url.format(requestURI)).then((results) => {
      accept(results);
    });
  });
}

var cardcastAPI = {};

cardcastAPI.search = (searchTerm) => {
  return new Promise((accept, reject) => {
    var requestURI = util.format(SEARCH_URI, searchTerm);

    httpsGet(url.format(requestURI)).then((results) => {
      accept(results);
    });
  });
}