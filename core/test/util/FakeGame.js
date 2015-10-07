'use strict'

const Game = require('../../src/Game'),
  prefillBoard = require('./prefillBoard')

module.exports = class FakeGame extends Game {
  fillBoardFromMatrix(boardMatrix) {
    this.board = prefillBoard.fromMatrix(boardMatrix)
    return this
  }
}
