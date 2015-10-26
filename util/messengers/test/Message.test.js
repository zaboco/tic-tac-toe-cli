'use strict'

require('chai').should()

const Message = require('../src/message')

suite('Message', function() {
  this.timeout(100)

  const token = {}
  let message
  setup(() => {
    message = Message.empty()
  })

  test('send and wait for receive', done => {
    const newMessage = message.send(token)
    newMessage.onReceive(receivedToken => {
      receivedToken.should.equal(token)
      done()
    })
  })

  test('wait for receive, then send', done => {
    const newMessage = message.onReceive(receivedToken => {
      receivedToken.should.equal(token)
      done()
    })
    newMessage.send(token)
  })

  test('onReceive can take null handler', () => {
    message.send().onReceive()
  })

  test('should not send twice in a row', () => {
    const newMessage = message.send()
    newMessage.send.should.throw(/should.*not.*send.*twice/i)
  })

  test('should not wait for response twice in a row', () => {
    const newMessage = message.onReceive()
    newMessage.onReceive.should.throw(/should.*not.*receive.*twice/i)
  })

  test('send & receive twice', done => {
    const newMessage = message.send().onReceive().send(token)
    newMessage.onReceive(receivedToken => {
      receivedToken.should.equal(token)
      done()
    })
  })

  test('wait & send twice', done => {
    const newMessage = message.onReceive().send().onReceive(receivedToken => {
      receivedToken.should.equal(token)
      done()
    })
    newMessage.send(token)
  })
})
