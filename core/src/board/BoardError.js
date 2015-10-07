'use strict'

const BoardError = module.exports = class BoardError extends Error {
  static cellOutsideBoard() {
    return new this.CellOutsideBoard(`Coordinates must be within 0-2!`)
  }

  static cellNotEmpty(coords) {
    return new this.CellNotEmpty(`Cell at ${coords.join(':')} is not empty!`)
  }
}

BoardError.CellOutsideBoard = class CellOutsideBoard extends BoardError {}
BoardError.CellNotEmpty = class CellNotEmpty extends BoardError {}


