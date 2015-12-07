'use strict'

const wrapClass = require('async-class').wrap

const Board = require('../src/board')

class _Game {
  constructor(players, board) {
    this.players = players
    this.board = board || Board.empty()
  }

  getBoard() {
    return this.board
  }

  getCurrentPlayer() {
    return this.players[0]
  }

  getWinningPlayer() {
    return this.players.find(player => player.getSign() === this.board.getWinningSign())
  }

  isTie() {
    return this.board.hasTie()
  }

  isOpen() {
    return !this.board.isFinished()
  }

  *next() {
    if (this.isOpen()) {
      yield this._updateBoard()
      this._swapPlayers()
    }
    return this
  }

  *_updateBoard() {
    let coords = yield this.getCurrentPlayer().findMoveFor(this.board)
    this.board = this.board.fillCellAt(coords, this.getCurrentPlayer().getSign())
  }

  _swapPlayers() {
    this.players.reverse()
  }

  static make(players) {
    return new _Game(players)
  }
}

module.exports = wrapClass(_Game)
