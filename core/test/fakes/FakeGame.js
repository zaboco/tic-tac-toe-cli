'use strict'

const Game = require('../../src/Game'),
  prefilledBoard = require('../../src/board/prefilled')

module.exports = class FakeGame extends Game {
  fillBoardFromMatrix(boardMatrix) {
    this.board = prefilledBoard.fromMatrix(boardMatrix)
    return this
  }
}
