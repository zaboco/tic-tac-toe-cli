'use strict'

const EventEmitter = require('events').EventEmitter

module.exports = PendingMessenger

const EmptyMessenger = require('./EmptyMessenger')

function PendingMessenger() {
  const emitter = new EventEmitter()

  return {
    send(value) {
      emitter.emit('send', value)
      return EmptyMessenger()
    },

    onSend(handler){
      emitter.on('send', handler || (() => {}))
      return this
    },

    onReceive() {
      throw Error('Should not wait for receive twice in a row')
    }
  }
}
