'use strict'

const assert = require('chai').assert
const sinon = require('sinon')
sinon.assert.expose(assert, { prefix: '' })
require('co-mocha')

const GameController = require('../src/GameController')

suite('GameController', function() {
  let gameStub, gameMakerSpy, gameUiStub, playerMakerStub, gameController
  setup(function() {
    playerMakerStub = sinon.stub().returns(Promise.resolve())
    gameStub = sinon.stub({
      getBoard() {},
      isOpen() {},
      next() { return Promise.resolve() }
    })
    gameMakerSpy = sinon.spy(() => Promise.resolve(gameStub))
    gameUiStub = sinon.stub({
      showBoard() {}
    })
    gameController = new GameController(gameMakerSpy, playerMakerStub, gameUiStub)
  })

  test('calls playerMaker twice, once for each sign', function*() {
    yield gameController.runGame()
    assert.callOrder(playerMakerStub.withArgs('X'), playerMakerStub.withArgs('O'))
  })

  test('makes a game with the given players', function*() {
    const firstPlayer = 'first player', secondPlayer = 'second player'
    stubPlayerMakerWithPlayers(firstPlayer, secondPlayer)
    yield gameController.runGame()
    assert.calledWith(gameMakerSpy, [firstPlayer, secondPlayer])
  })

  test('if first shows the board', function*() {
    let someBoard = { board: [] }
    gameStub.getBoard.returns(someBoard)
    yield gameController.runGame()
    assert.calledWith(gameUiStub.showBoard, someBoard)
  })

  function stubPlayerMakerWithPlayers(firstPlayer, secondPlayer) {
    playerMakerStub.onFirstCall().returns(Promise.resolve(firstPlayer))
    playerMakerStub.onSecondCall().returns(Promise.resolve(secondPlayer))
  }
})
