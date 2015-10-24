'use strict'

module.exports = ConfirmedMessenger

const emptyMessage = require('./message').empty()

function ConfirmedMessenger() {
  let message, confirmation

  return Object.create({
    send(value) {
      return new Promise(resolve => {
        message = message.send(value)
        confirmation = confirmation.onReceive(resolve)
      })
    },

    wait() {
      return new Promise(resolve => {
        confirmation = confirmation.send()
        message = message.onReceive(resolve)
      })
    },

    reset() {
      message = emptyMessage
      confirmation = emptyMessage
      return this
    }
  }).reset()
}
