'use strict'

const ManualMoveAdviser = require('../../../../advisers/manual')
const Player = require('../../../../core').Player

module.exports = class FakePlayer {
  constructor(sign) {
    this.manualAdviser = new ManualMoveAdviser()
    this.gamePlayer = new Player(sign, this.manualAdviser)
    this.sign = sign
  }

  chooseCoords(coords) {
    return this.manualAdviser.triggerAdvice(coords)
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
