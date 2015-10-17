'use strict'

module.exports = CoordsValidator

function CoordsValidator(board) {
  return function validateCoords(coords) {
    if (board.areCoordsOutside(coords)) {
      return `The position ${coords} is outside the board`
    }
    if (!board.isEmptyAt(coords)) {
      return `The cell at ${coords} is not empty`
    }
    return true
  }
}

