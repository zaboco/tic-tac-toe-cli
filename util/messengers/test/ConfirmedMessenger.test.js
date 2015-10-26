'use strict'

const sinon = require('sinon')
const wco = require('co').wrap
require('chai').use(require('sinon-chai')).should()

const ConfirmedMessenger = require('../src/ConfirmedMessenger')

suite('messenger/confirmed', () => {
  let eventHandler, confirmedMessenger
  setup(() => {
    eventHandler = sinon.spy()
    confirmedMessenger = ConfirmedMessenger()
  })

  const someValue = 1
  test('waits for send confirmation', wco(function*() {
    confirmedMessenger.wait().then(eventHandler)
    yield confirmedMessenger.send(someValue)
    eventHandler.should.have.been.calledWith(someValue)
  }))

  test('can send before waiting', wco(function*() {
    confirmedMessenger.send(someValue)
    let receivedValue = yield confirmedMessenger.wait()
    receivedValue.should.equal(someValue)
  }))

  test('does not send a new message until the current one was received', wco(function*() {
    confirmedMessenger.send(someValue)
    confirmedMessenger.send(someValue).then(eventHandler)
    yield confirmedMessenger.wait()
    eventHandler.should.not.have.been.called
  }))

  test('does not receive another message until one was sent', wco(function*() {
    confirmedMessenger.wait()
    confirmedMessenger.wait().then(eventHandler)
    yield confirmedMessenger.send(someValue)
    eventHandler.should.not.have.been.called
  }))

  test('can send another value after reset', wco(function*() {
    const otherValue = someValue + 1
    confirmedMessenger.send(someValue)
    confirmedMessenger.reset()
    confirmedMessenger.send(otherValue).then(eventHandler)
    let receivedValue = yield confirmedMessenger.wait()
    receivedValue.should.equal(otherValue)
  }))

  test('does not wait anymore for a message after reset', wco(function*() {
    const otherEventHandler = sinon.spy()
    confirmedMessenger.wait().then(eventHandler)
    confirmedMessenger.reset()
    confirmedMessenger.wait().then(otherEventHandler)
    yield confirmedMessenger.send(someValue)
    eventHandler.should.not.have.been.called
    otherEventHandler.should.have.been.calledWith(someValue)
  }))
})
