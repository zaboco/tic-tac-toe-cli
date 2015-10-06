'use strict'

const EventEmitter = require('events').EventEmitter

const Board = require('./board/Board')

module.exports = class Game {
  constructor(players) {
    this.players = players
    this.emitter = new EventEmitter()
    this.board = Board.empty()
  }

  on() {
    this.emitter.on.apply(this.emitter, arguments)
  }

  emit() {
    this.emitter.emit.apply(this.emitter, arguments)
  }

  run() {
    this.emit('game.start')
    this.emit('round.start', this._currentPlayer(), this.board)
    this._currentPlayer().willChooseCoordsFor(this.board).then(coords => {
      this.emit('round.end', this._currentPlayer())
    })
  }

  _currentPlayer() {
    return this.players[0]
  }
}
