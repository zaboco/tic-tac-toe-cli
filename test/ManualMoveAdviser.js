'use strict'

const EventEmitter = require('events').EventEmitter

module.exports = function StaticMoveAdviser() {
  return {
    emitter: new EventEmitter(),

    triggerAdvice(coords) {
      this.emitter.emit('advice', coords)
    },

    coordsFor() {
      return new Promise(resolve => {
        this.emitter.on('advice', resolve)
      })
    }
  }
}
