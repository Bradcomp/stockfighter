const get = require('./helpers/getrequest');
const {URL} = require('../config')

const checkup = () =>
    get(`${URL}/heartbeat`)

const checkVenue = venue => 
    get(`${URL}/venues/${venue}/heartbeat`)

module.exports = {checkup, checkVenue};