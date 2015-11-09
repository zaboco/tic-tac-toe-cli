'use strict'

const Player = require('../../src/Player')

module.exports = class FakePlayer extends Player {
  constructor(sign) {
    super(sign)
    this.becomeReady = () => {}
  }

  waitUntilReady() {
    return new Promise(resolve => this.becomeReady = resolve)
  }

  willChooseCoordsFor() {
    this.becomeReady()
    return new Promise(resolve => this.moveCallback = resolve)
  }

  makeWrongMove() {
    const outsideCoords = [3, 5]
    this.makeMove(outsideCoords)
  }

  makeMove(coords) {
    if (this.moveCallback == null) {
      throw Error(`Player ${this.sign} was no required to move`)
    }
    this.moveCallback(coords)
  }
}
