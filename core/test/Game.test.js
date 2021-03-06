'use strict'

const sinon = require('sinon')

require('chai').use(require('sinon-chai')).should()

const wco = require('co').wrap

const FakeGame = require('./fakes/FakeGame'),
  registry = require('../../registry'),
  BoardError = require('../src/board/BoardError')
suite('Game', function() {
  const X = 'X', O = 'O', _ = null
  let game, firstPlayer, secondPlayer

  const __ = sinon.match.any
  let eventHandler
  setup(wco(function*() {
    firstPlayer = yield makeFakePlayer(X)
    secondPlayer = yield makeFakePlayer(O)
    game = new FakeGame([firstPlayer, secondPlayer])
    eventHandler = sinon.spy()
  }))

  suite('on run', () => {
    test('the game starts', () => {
      game.on('game.start', eventHandler)
      game.run()
      eventHandler.should.have.been.called
    })

    suite('first round starts', () => {
      setup(() => {
        game.on('round.start', eventHandler)
      })

      test('with first player', () => {
        game.run()
        eventHandler.should.have.been.calledWith(firstPlayer)
      })

      test('with empty board', () => {
        game.run()
        eventHandler.should.have.been.calledWith(__, sinon.match(board => board.isEmpty()))
      })
    })
  })

  suite('after first player chooses coords', () => {
    const someCoords = [0, 0]
    setup(() => {
      game.run()
    })

    test('board error is emitted if wrong coords', done => {
      const wrongCoords = [3, 5]
      game.on('error', err => {
        err.should.be.instanceOf(BoardError)
        done()
      })
      firstPlayer.chooseCoords(wrongCoords)
    })

    suite('first round ends', () => {
      setup(() => {
        game.on('round.end', eventHandler)
      })

      test('with the first player', wco(function* () {
        yield firstPlayer.chooseCoords(someCoords)
        eventHandler.should.have.been.calledWith(firstPlayer)
      }))

      test('with chosen coords', wco(function* () {
        yield firstPlayer.chooseCoords(someCoords)
        eventHandler.should.have.been.calledWith(__, someCoords)
      }))
    })

    suite('second round starts', () => {
      setup(() => {
        game.on('round.start', eventHandler)
      })

      test('with the second player', wco(function* () {
        yield firstPlayer.chooseCoords(someCoords)
        eventHandler.should.have.been.calledWith(secondPlayer)
      }))

      test('with the updated board', wco(function* () {
        yield firstPlayer.chooseCoords(someCoords)
        eventHandler.should.have.been.calledWith(__, sinon.match(board => {
          return firstPlayer.hasSign(board.getSignAt(someCoords))
        }))
      }))
    })
  })

  suite('after second player chooses coords', () => {
    const firstCoords = [0, 0], secondCoords = [0, 1]

    setup(done => {
      game.on('error', done)
      game.run()
      firstPlayer.chooseCoords(firstCoords).then(() => done())
    })

    test('with the second player', wco(function* () {
      game.on('round.end', eventHandler)
      yield secondPlayer.chooseCoords(secondCoords)
      eventHandler.should.have.been.calledWith(secondPlayer)
    }))

    test('third round starts with the first player', wco(function* () {
      game.on('round.start', eventHandler)
      yield secondPlayer.chooseCoords(secondCoords)
      eventHandler.should.have.been.calledWith(firstPlayer)
    }))
  })

  suite('end game', () => {
    const winningCoords = [2, 2], tieCoords = [2, 1]
    setup(done => {
      game.fillBoardFromMatrix([
        [X, O, O],
        [O, X, X],
        [X, _, _]
      ])
      game.on('error', done)
      game.run()
      done()
    })

    test('first player wins', wco(function* () {
      game.on('game.won', eventHandler)
      yield firstPlayer.chooseCoords(winningCoords)
      eventHandler.should.have.been.calledWith(firstPlayer)
    }))

    test('it is a tie if first player chooses poorly', wco(function* () {
      yield firstPlayer.chooseCoords(tieCoords)
      game.on('game.tie', eventHandler)
      yield secondPlayer.chooseCoords(winningCoords)
      eventHandler.should.have.been.called
    }))
  })
})

function makeFakePlayer(sign) {
  registry.set('playerMaker', registry.$$('playerMakers.Fake'))
  return registry.playerMaker(sign)
}
