'use strict'

require('chai').use(require('sinon-chai')).should()

const sinon = require('sinon')
const wco = require('co').wrap

const TypedPlayerProvider = require('../src/TypedPlayerProvider')
const FakeTypeReader = require('./FakeTypeReader')
const FakePlayerMakersRegistry = require('./FakePlayerMakersRegistry')

suite('TypedPlayerProvider', () => {
  const fakeType = 'fakeType'
  let playerProvider, playerMakerSpy
  setup(() => {
    playerMakerSpy = sinon.spy()
    playerProvider = TypedPlayerProvider({
      typeReader: FakeTypeReader(fakeType),
      playerMakersRegistry: FakePlayerMakersRegistry(fakeType, playerMakerSpy)
    })
  })

  test('it builds a player with the Builder of the type chosen', wco(function*() {
    const someSign = 'X'
    yield playerProvider(someSign)
    playerMakerSpy.should.have.been.calledWith(someSign)
  }))
})
