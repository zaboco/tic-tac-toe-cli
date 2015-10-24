'use strict'

const ManualMoveAdviser = require('./ManualMoveAdviser')
const Player = require('../../../../core').Player

module.exports = class FakePlayer {
  constructor(sign) {
    this.manualAdviser = ManualMoveAdviser()
    this.gamePlayer = new Player(sign, this.manualAdviser)
    this.sign = sign
  }

  chooseCoords(coords) {
    return this.manualAdviser.trigger(coords)
  }

  willChooseCoordsFor(board) {
    return this.gamePlayer.willChooseCoordsFor(board)
  }

  fillCellOnBoard(board, coords) {
    return this.gamePlayer.fillCellOnBoard(board, coords)
  }

  toString() {
    return this.gamePlayer.toString()
  }
}
