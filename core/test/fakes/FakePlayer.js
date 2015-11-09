'use strict'

module.exports = class FakePlayer {
  constructor(sign) {
    this.sign = sign
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
    this.chooseCoords(outsideCoords)
  }

  chooseCoords(coords) {
    if (this.moveCallback == null) {
      throw Error(`Player ${this.sign} was no required to move`)
    }
    this.moveCallback(coords)
  }

  fillCellOnBoard(board, coords) {
    return board.fillCellAt(coords, this.sign)
  }

  getSign() {
    return this.sign
  }
}
