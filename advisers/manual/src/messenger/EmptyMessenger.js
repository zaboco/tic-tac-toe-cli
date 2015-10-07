'use strict'

module.exports = EmptyMessenger

const PendingMessenger = require('./PendingMessenger'),
  ReadyMessenger = require('./ReadyMessenger')

function EmptyMessenger() {
  return {
    send(value) {
      return ReadyMessenger(value)
    },

    onReceive(handler) {
      return PendingMessenger().onSend(handler)
    }
  }
}
