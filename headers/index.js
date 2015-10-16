'use strict'

const NumericHeader = require('./NumericHeader'),
  AlphabeticHeader = require('./AlphabeticHeader')

module.exports = {
  Numeric(startingIndex) {
    return new NumericHeader(startingIndex)
  },

  Alphabetic(startingLetter) {
    return new AlphabeticHeader(startingLetter)
  }
}
