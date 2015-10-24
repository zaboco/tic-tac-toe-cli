'use strict'

const EventEmitter = require('events').EventEmitter

module.exports = PendingMessage

const EmptyMessage = require('./EmptyMessage')

function PendingMessage() {
  const emitter = new EventEmitter()

  return {
    send(value) {
      emitter.emit('send', value)
      return EmptyMessage()
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
