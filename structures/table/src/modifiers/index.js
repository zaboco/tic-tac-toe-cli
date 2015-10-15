'use strict'

const TableBorderAdder = require('./TableBorderAdder'),
  HeaderColumnAdder = require('./HeaderColumnAdder')

module.exports = {
  border(settings) {
    return new TableBorderAdder(settings)
  },

  headerColumn(header) {
    return new HeaderColumnAdder(header)
  }
}
