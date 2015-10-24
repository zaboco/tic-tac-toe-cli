'use strict'

require('chai').should()

const SimpleMessenger = require('../src/SimpleMessenger')

suite('messenger/simple', () => {
  let simpleMessenger
  setup(() => {
    simpleMessenger = SimpleMessenger()
  })

  const someValue = 1
  test('receives when sending value before', done => {
    simpleMessenger.send(someValue)
    simpleMessenger.wait().then(value => {
      value.should.equal(someValue)
      done()
    }).catch(done)
  })

  test('receives when sending value afterwards', done => {
    simpleMessenger.wait().then(value => {
      value.should.equal(someValue)
      done()
    }).catch(done)
    simpleMessenger.send(someValue)
  })

  test('can send again after reset', done => {
    simpleMessenger.send()
    simpleMessenger.reset()
    simpleMessenger.send()
    simpleMessenger.wait().then(() => done()).catch(done)
  })

  test('can wait again after reset', done => {
    simpleMessenger.wait()
    simpleMessenger.reset()
    simpleMessenger.wait().then(() => done()).catch(done)
    simpleMessenger.send()
  })
})
