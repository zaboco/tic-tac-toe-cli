'use strict'

const Player = require('../../../../core').Player

module.exports = class NamedPlayer {
  constructor(sign, adviser, name) {
    this.gamePlayer = new Player(sign, adviser)
    this.name = name
    this.sign = sign
  }

  willChooseCoordsFor(board) {
    return this.gamePlayer.willChooseCoordsFor(board)
  }

  fillCellOnBoard(board, coords) {
    return this.gamePlayer.fillCellOnBoard(board, coords)
  }

  toString() {
    return `(${this.sign}) ${this.name}`
  }
}
