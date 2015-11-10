'use strict'

const _ = require('lodash')

const Player = require('../../../../core').Player

module.exports = class NamedPlayer {
  constructor(sign, adviser, name) {
    this.gamePlayer = new Player(sign, adviser)
    this.name = name
    this.sign = sign
  }

  findMoveFor(board) {
    return this.gamePlayer.findMoveFor(board)
  }

  getSign() {
    return this.gamePlayer.getSign()
  }

  toString() {
    let namePart = _.isEmpty(this.name) ? '' : `${this.name}`
    return `${this.sign}${namePart}`
  }
}
