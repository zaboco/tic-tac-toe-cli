'use strict'

const TableBorderAdder = require('./TableBorderAdder')

module.exports = {
  border(settings) {
    return new TableBorderAdder(settings)
  }
}
