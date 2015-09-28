'use strict'

module.exports = class BoardError extends Error {
  static CellOutsideBoard() {
    return new BoardError(`Coordinates must be within 0-2!`)
  }

  static CellNotEmpty(coords) {
    return new BoardError(`Cell at ${coords.join(':')} is not empty!`)
  }
}


