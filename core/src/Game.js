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
    this._emit('round.start', this._currentPlayer())
    this._currentPlayer().willChooseCoordsFor(this.board).then(coords => {
      this.board = this.board.fillCellAt(coords, this._currentPlayer().getSign())
      this._endRound()
    }).catch(err => {
      this._emit('error', err)
    })
  }

  _endRound() {
    this._emit('round.end', this._currentPlayer(), this.board)
    this.board.performOnStatus({
      win: (sign) => this._emit('game.won', this._playerWithSign(sign)),
      tie: () => this._emit('game.tie'),
      ongoing: () => this._nextRound()
    })
  }

  _nextRound() {
    this._swapPlayers()
    return this._startRound()
  }

  _playerWithSign(sign) {
    return this.players.find(player => player.getSign() === sign)
  }

  _swapPlayers() {
    this.players.reverse()
  }

  _currentPlayer() {
    return this.players[0]
  }
}
