'use strict'

require('chai').should()

const Messenger = require('../src/messenger')

suite('Messenger', function() {
  this.timeout(100)

  const token = {}
  let messenger
  setup(() => {
    messenger = Messenger.empty()
  })

  test('send and wait for receive', done => {
    const newMessenger = messenger.send(token)
    newMessenger.onReceive(receivedToken => {
      receivedToken.should.equal(token)
      done()
    })
  })

  test('wait for receive, then send', done => {
    const newMessenger = messenger.onReceive(receivedToken => {
      receivedToken.should.equal(token)
      done()
    })
    newMessenger.send(token)
  })

  test('onReceive can take null handler', () => {
    messenger.send().onReceive()
  })

  test('should not send twice in a row', () => {
    const newMessenger = messenger.send()
    newMessenger.send.should.throw(/should.*not.*send.*twice/i)
  })

  test('should not wait for response twice in a row', () => {
    const newMessenger = messenger.onReceive()
    newMessenger.onReceive.should.throw(/should.*not.*receive.*twice/i)
  })

  test('send & receive twice', done => {
    const newMessenger = messenger.send().onReceive().send(token)
    newMessenger.onReceive(receivedToken => {
      receivedToken.should.equal(token)
      done()
    })
  })

  test('wait & send twice', done => {
    const newMessenger = messenger.onReceive().send().onReceive(receivedToken => {
      receivedToken.should.equal(token)
      done()
    })
    newMessenger.send(token)
  })
})
