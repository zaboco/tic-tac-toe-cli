'use strict'

module.exports = ReadyMessage

const EmptyMessage = require('./EmptyMessage')

function ReadyMessage(value) {
  return {
    send() {
      throw Error('Should not send twice in a row')
    },

    onReceive(handler) {
      handler = handler || (() => {})
      handler(value)
      return EmptyMessage()
    }
  }
}
