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
    return board.fillCellAt(coords, this.sign)
  }

  getSign() {
    return this.sign
  }

  toString() {
    return `Player(${this.sign})`
  }
}
