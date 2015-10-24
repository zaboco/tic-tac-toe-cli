'use strict'

module.exports = EmptyMessage

const PendingMessage = require('./PendingMessage'),
  ReadyMessage = require('./ReadyMessage')

function EmptyMessage() {
  return {
    send(value) {
      return ReadyMessage(value)
    },

    onReceive(handler) {
      return PendingMessage().onSend(handler)
    }
  }
}
