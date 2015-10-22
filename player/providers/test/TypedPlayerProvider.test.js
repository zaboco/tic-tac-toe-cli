'use strict'

require('chai').use(require('sinon-chai')).should()
const _ = require('lodash')

const sinon = require('sinon')
const wco = require('co').wrap

const providersInjector = require('../di')
const FakeTypeReader = require('./FakeTypeReader')
const FakePlayerMakersRegistry = require('./FakePlayerMakersRegistry')

const container = require('../../../container')

suite('TypedPlayerProvider', () => {
  setup(() => {
    providersInjector.register(container, 'Typed')
    container.set('typeReader', $ => FakeTypeReader($.fakeType))
    container.set('playerMakersRegistry', $ => {
      return FakePlayerMakersRegistry($.fakeType, $.fakePlayerMaker)
    })
  })

  test('it builds a player with the Builder of the type chosen', wco(function*() {
    const someType = 'a', someSign = 'X'
    let playerMakerSpy = sinon.spy()
    container.set('fakeType', someType)
    container.set('fakePlayerMaker', () => playerMakerSpy)
    yield container.playerProvider(someSign)
    playerMakerSpy.should.have.been.calledWith(someSign)
  }))
})
