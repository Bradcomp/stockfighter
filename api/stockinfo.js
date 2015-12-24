'use strict';
const get = require('./helpers/getrequest');
const {URL} = require('../config');
const {curry} = require('ramda');

const getStocks = venue => 
    get(`${URL}/venues/${venue}/stocks`)
      

const getOrderbook = curry((venue, stock) => 
    get(`${URL}/venues/${venue}/stocks/${stock}`)
);

const getQuote = curry((venue, stock) => 
    get(`${URL}/venues/${venue}/stocks/${stock}/quote`)
);

