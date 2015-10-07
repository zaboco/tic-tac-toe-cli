'use strict'

module.exports = class Player {
  constructor(sign, moveAdviser) {
    this.sign = sign
    this.moveAdviser = moveAdviser
  }

  willChooseCoordsFor(board) {
    return this.moveAdviser.coordsFor(board, this.sign)
  }

  fillCellOnBoard(board, coords) {
    return board.fillCell(coords, this.sign)
  }

  toString() {
    return `Player(${this.sign})`
  }
}
