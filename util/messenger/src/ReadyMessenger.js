'use strict'

module.exports = ReadyMessenger

const EmptyMessenger = require('./EmptyMessenger')

function ReadyMessenger(value) {
  return {
    send() {
      throw Error('Should not send twice in a row')
    },

    onReceive(handler) {
      handler = handler || (() => {})
      handler(value)
      return EmptyMessenger()
    }
  }
}
