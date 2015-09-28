'use strict'

const BoardError = require('./BoardError')

module.exports = class Board {
  constructor() {
  }

  isEmptyAt(coords) {
    if (coordOutsideRange(coords[0], 0, 2) || coordOutsideRange(coords[1], 0, 2)) {
      throw BoardError.CellOutsideBoard()
    }
    return true
  }
}

function coordOutsideRange(coord, from, to) {
  return coord < from || coord > to
}
