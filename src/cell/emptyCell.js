'use strict'

const FilledCell = require('./FilledCell')

const EMPTY_CELL_SIGN = ' '

module.exports = {
  isEmpty() {
    return true
  },

  getSign() {
    return EMPTY_CELL_SIGN
  },

  fillWith(sign) {
    return sign != null ? new FilledCell(sign) : this
  },

  sameAs() {
    return false
  }
}
