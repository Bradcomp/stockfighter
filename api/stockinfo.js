'use strict';
const get = require('./helpers/getrequest')
const {URL} = require('../config')

const getStocks = venue => 
    get(`${URL}/venues/${venue}/stocks`)
      

const getOrderbook = (venue, stock) => 
    get(`${URL}/venues/${venue}/stocks/${stock}`)
       

const getQuote = (venue, stock) => 
    get(`${URL}/venues/${venue}/stocks/${stock}/quote`)


