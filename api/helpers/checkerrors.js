'use strict';
const {compose, prop} = require('ramda')

const rejectFalse = data => data.ok ? Promise.resolve(data) : Promise.reject(data)
const checkErrors = compose(rejectFalse, prop('data'))

module.exports = checkErrors;