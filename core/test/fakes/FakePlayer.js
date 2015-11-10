'use strict'

module.exports = class FakePlayer {
  constructor(sign) {
    this.sign = sign
    this.notifyItWasAsked = () => {}
  }

  getSign() {
    return this.sign
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
