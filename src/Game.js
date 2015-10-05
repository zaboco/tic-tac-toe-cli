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
    this.emit('round.start', this.players[0], this.board)
  }
}
