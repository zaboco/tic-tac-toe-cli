'use strict'

module.exports = SimpleMessenger

const emptyMessage = require('./message').empty()

function SimpleMessenger() {
  let message

  return Object.create({
    send(value) {
      message = message.send(value)
    },

    wait() {
      return new Promise(resolve => {
        message = message.onReceive(resolve)
      })
    },

    reset() {
      message = emptyMessage
      return this
    }
  }).reset()
}
