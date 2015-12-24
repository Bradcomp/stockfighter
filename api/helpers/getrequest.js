'use strict';
const request = require('axios');
const checkErrors = require('./checkerrors');

module.exports = url => 
    request
        .get(url)
        .then(checkErrors)