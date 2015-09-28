'use strict'

const _ = require('lodash')

const BoardError = require('./BoardError')

const SIZE = 3

module.exports = class Board {
  constructor() {
  }

  getSignAt(coords) {
    return ' '
  }

  isEmptyAt(coords) {
    if (Board._anyCoordsOutside(coords)) {
      throw BoardError.CellOutsideBoard()
    }
    return true
  }

  fillCell(coords, sign) {
    return new Board()
  }

  static _anyCoordsOutside(coords) {
    return _.any(coords, (coord) => outsideRange(Board._validCoordRange(), coord))
  }

  static _validCoordRange() {
    return [0, SIZE - 1]
  }
}

function outsideRange(range, value) {
  return value < range[0] || value > range[1]
}
