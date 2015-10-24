'use strict'

module.exports = class Player {
  constructor(sign, moveAdviser) {
    this.sign = sign
    this.moveAdviser = moveAdviser
  }

  willChooseCoordsFor(board) {
    return this.moveAdviser(board, this.sign)
  }

  fillCellOnBoard(board, coords) {
    return board.fillCell(coords, this.sign)
  }

  hasSign(sign) {
    return this.sign === sign
  }

  toString() {
    return `Player(${this.sign})`
  }
}
