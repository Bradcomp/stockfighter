'use strict';
const request = require('axios');
const {curry} = require('ramda');
const {URL, API_KEY} = require('../config');
const checkErrors = require('./helpers/checkerrors');

const headers = {headers: {'X-Starfighter-Authorization': API_KEY}}

const orderStock = curry((direction, account, venue, orderType, stock, price, qty) =>
    request
        .post(
            `${URL}/venues/${venue}/stocks/${stock}/orders`, 
            {account, venue, stock, price, qty, direction, orderType},
            headers
        )
        .then(checkErrors)
);

const buyStock = orderStock('buy');
const sellStock = orderStock('sell');

const checkOrder = curry((venue, stock, id) => 
    request
        .get(`${URL}/venues/${venue}/stocks/${stock}/orders/${id}`, headers)
        .then(checkErrors)
);

const cancelOrder = curry((venue, stock, id) => 
    request
        .delete(`${URL}/venues/${venue}/stocks/${stock}/orders/${id}`, headers)
        .then(checkErrors)
);

const checkAllOrders = curry((account, venue) => 
    request
        .get(`${URL}/venues/${venue}/accounts/${account}/orders`, headers)
        .then(checkErrors)
);

const checkStockOrders = curry((account, venue, stock) => 
    request
        .get(`${URL}/venues/${venue}/accounts/${account}/stocks/${stock}/orders`, headers)
        .then(checkErrors)
);

module.exports = {buyStock, sellStock, orderStock, checkOrder, cancelOrder, checkAllOrders, checkStockOrders};
