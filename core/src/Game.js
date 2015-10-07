'use strict'

const EventEmitter = require('events').EventEmitter

const Board = require('./board')

module.exports = class Game {
  constructor(players) {
    this.players = players
    this.emitter = new EventEmitter()
    this.board = Board.empty()
  }

  on() {
    this.emitter.on.apply(this.emitter, arguments)
  }

  _emit() {
    this.emitter.emit.apply(this.emitter, arguments)
  }

  run() {
    this._emit('game.start')
    this._startRound()
  }

  _startRound() {
    this._emit('round.start', this._currentPlayer(), this.board)
    this._currentPlayer().willChooseCoordsFor(this.board).then(coords => {
      this._endRound(coords)
    }).catch(err => {
      this._emit('error', err)
    })
  }

  _endRound(coords) {
    this._emit('round.end', this._currentPlayer(), coords)
    this.board = this._currentPlayer().fillCellOnBoard(this.board, coords)
    this._swapPlayers()
    return this._startRound()
  }

  _swapPlayers() {
    this.players.reverse()
  }

  _currentPlayer() {
    return this.players[0]
  }
}
