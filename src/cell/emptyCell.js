'use strict'

const FilledCell = require('./FilledCell')

const EMPTY_CELL_SIGN = ' '

const emptyCell = module.exports = {
  isEmpty() {
    return true
  },

  getSign() {
    return EMPTY_CELL_SIGN
  },

  fillWith(sign) {
    return new FilledCell(sign)
  },

  sameAs() {
    return false
  }
}
