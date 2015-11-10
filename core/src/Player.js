'use strict'

module.exports = class Player {
  constructor(sign, moveAdviser) {
    this.sign = sign
    this.moveAdviser = moveAdviser
  }

  findMoveFor(board) {
    return this.moveAdviser(board, this.sign)
  }

  getSign() {
    return this.sign
  }

  toString() {
    return `Player(${this.sign})`
  }
}
