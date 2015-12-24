'use strict';
const {mergeAll} = require('ramda')

const orders = require('./api/orders');
const checkups = require('./api/checkups');
const sockets = require('./api/sockets');
const stockInfo = require('./api/stockInfo');

module.exports = mergeAll([orders, sockets, checkups, stockInfo]);
