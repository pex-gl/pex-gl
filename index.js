'use strict'
const isPlask = require('is-plask')

module.exports = isPlask ? require('./index-plask.js') : require('./index-browser.js')
