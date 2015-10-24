'use strict'

const Messenger = require('../../../../util').Messenger

module.exports = class ManualMoveAdviser {
  constructor() {
    this.move = Messenger.empty()
    this.finished = Messenger.empty()
  }

  triggerAdvice(coords) {
    return new Promise(resolve => {
      this.move = this.move.send(coords)
      this.finished = this.finished.onReceive(resolve)
    })
  }

  coordsFor() {
    return new Promise(resolve => {
      this.finished = this.finished.send()
      this.move = this.move.onReceive(resolve)
    })
  }
}

