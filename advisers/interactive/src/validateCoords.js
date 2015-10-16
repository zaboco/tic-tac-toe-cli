'use strict'

module.exports = validateCoords

function validateCoords(coords, board) {
  if (board.areCoordsOutside(coords)) {
    return `The position ${coords} is outside the board`
  }
  if (!board.isEmptyAt(coords)) {
    return `The cell at ${coords} is not empty`
  }
  return true
}
