'use strict'

module.exports = class Player {
  constructor(sign) {
    this.sign = sign
  }

  fillCellOnBoard(board) {
    let newBoard = board.fillCell([0, 0], this.sign)
    return Promise.resolve(newBoard)
  }
}
