'use strict'

const ManualAdviser = require('./ManualAdviser')
const ConfirmedMessenger = require('../../../../util').messengers.Confirmed
const Player = require('../../../../core').Player

module.exports = class FakePlayer {
  constructor(sign) {
    this.messenger = ConfirmedMessenger()
    this.gamePlayer = new Player(sign, ManualAdviser(this.messenger))
  }

  chooseCoords(coords) {
    return this.messenger.send(coords)
  }

  willChooseCoordsFor(board) {
    return this.gamePlayer.willChooseCoordsFor(board)
  }

  fillCellOnBoard(board, coords) {
    return this.gamePlayer.fillCellOnBoard(board, coords)
  }

  hasSign(sign) {
    return this.gamePlayer.hasSign(sign)
  }

  toString() {
    return this.gamePlayer.toString()
  }
}
