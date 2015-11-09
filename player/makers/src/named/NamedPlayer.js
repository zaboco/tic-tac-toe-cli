'use strict'

const _ = require('lodash')

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

  getSign() {
    return this.gamePlayer.getSign()
  }

  toString() {
    let namePart = _.isEmpty(this.name) ? '' : `${this.name}`
    return `${this.sign}${namePart}`
  }
}
