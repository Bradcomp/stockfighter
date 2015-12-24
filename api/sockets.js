'use strict';
const WebSocket = require('ws');
const {URL} = require('../config');
const {prop, compose, curry} = require('ramda');

const connect = (path, onMessage) => {
    let ws = new WebSocket(path);
    ws.on('open', ws =>  console.log(`opened Socket to ${path}`));
    ws.on('message', onMessage);
    return ws;
};

const ticker = curry((account, venue, onMessage) => 
    connect(`${URL}/ws/${account}/venues/${venue}/tickertape`, onMessage)
);

const stockTicker = curry((account, venue, stock, onMessage) => 
    connect(`${URL}/ws/${account}/venues/${venue}/tickertape/stocks/${stock}`, onMessage)
);

const executions = curry((account, venue, onMessage) => 
    connect(`${URL}/ws/${account}/venues/${venue}/executions`, onMessage)
);

const stockExecutions = curry((account, venue, stock, onMessage) =>
    connect(`${URL}/ws/${account}/venues/${venue}/executions/stocks/${stock}`, onMessage)
);

module.exports = {ticker, stockTicker, executions, stockExecutions}