'use strict'

const Player = require('../../src/Player')

module.exports = class FakePlayer extends Player {
  constructor(sign) {
    super(sign)
    this.notifyItWasAsked = () => {}
  }

  waitUntilAsked() {
    return new Promise(resolve => this.notifyItWasAsked = resolve)
  }

  willChooseCoordsFor() {
    this.notifyItWasAsked()
    return new Promise(resolve => this.notifyAboutMove = resolve)
  }

  makeWrongMove() {
    const outsideCoords = [3, 5]
    this.makeMove(outsideCoords)
  }

  makeMove(coords) {
    this.notifyAboutMove(coords)
  }
}
