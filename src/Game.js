'use strict'

const EventEmitter = require('events').EventEmitter

module.exports = class Game {
  constructor() {
    this.emitter = new EventEmitter()
  }

  on() {
    this.emitter.on.apply(this.emitter, arguments)
  }

  emit() {
    this.emitter.emit.apply(this.emitter, arguments)
  }

  run() {
    this.emit('game.start')
  }
}
