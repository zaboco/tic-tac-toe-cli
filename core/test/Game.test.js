'use strict'

require('chai').should()

const wco = require('co').wrap

const FakeGame = require('./util/FakeGame'),
  Player = require('../src/Player'),
  BoardError = require('../src/board/BoardError'),
  ManualMoveAdviser = require('../../advisers/manual')

suite('Game', function() {
  this.timeout(100)

  const X = 'X', O = 'O', _ = null
  let game, firstPlayer, secondPlayer
  setup(() => {
    firstPlayer = makePlayer(X)
    secondPlayer = makePlayer(O)
    game = new FakeGame([firstPlayer, secondPlayer])
  })

  suite('on run', () => {
    test('the game starts', done => {
      game.on('game.start', done)
      game.run()
    })

    suite('first round starts', () => {
      test('with first player', done => {
        game.on('round.start', currentPlayer => {
          currentPlayer.should.equal(firstPlayer)
          done()
        })
        game.run()
      })

      test('with empty board', done => {
        game.on('round.start', (__, board) => {
          board.isEmpty().should.be.true
          done()
        })
        game.run()
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
      test('with first player', done => {
        game.on('round.end', currentPlayer => {
          currentPlayer.should.equal(firstPlayer)
          done()
        })
        firstPlayer.chooseCoords(someCoords)
      })

      test('with chosen coords', done => {
        game.on('round.end', (__, coords) => {
          coords.should.equal(someCoords)
          done()
        })
        firstPlayer.chooseCoords(someCoords)
      })
    })

    suite('second round starts', () => {
      test('with the second player', done => {
        game.on('round.start', currentPlayer => {
          currentPlayer.should.equal(secondPlayer)
          done()
        })
        firstPlayer.chooseCoords(someCoords)
      })

      test('with the updated board', done => {
        game.on('round.start', (__, board) => {
          board.getSignAt(someCoords).should.equal(firstPlayer.sign)
          done()
        })
        firstPlayer.chooseCoords(someCoords)
      })
    })
  })

  suite('after second player chooses coords', () => {
    const firstCoords = [0, 0], secondCoords = [0, 1]

    setup(done => {
      game.on('error', done)
      game.run()
      return firstPlayer.chooseCoords(firstCoords).then(() => done())
    })

    test('second round ends with second player', done => {
      game.on('round.end', player => {
        player.should.equal(secondPlayer)
        done()
      })
      secondPlayer.chooseCoords(secondCoords)
    })

    test('third round starts with the first player', done => {
      game.on('round.start', player => {
        player.should.equal(firstPlayer)
        done()
      })
      secondPlayer.chooseCoords(secondCoords)
    })
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

    test('first player wins on next round start', wco(function* () {
      game.on('round.start', (player, board) => {
        board.hasWinner().should.be.true
      })
      yield firstPlayer.chooseCoords(winningCoords)
    }))

    test('it is a tie if first player chooses poorly', wco(function* () {
      yield firstPlayer.chooseCoords(tieCoords)
      game.on('round.start', (player, board) => {
        board.hasTie().should.be.true
      })
      yield secondPlayer.chooseCoords(winningCoords)
    }))
  })
})

function makePlayer(sign) {
  const player = new Player(sign, new ManualMoveAdviser())
  player.chooseCoords = function(coords) {
    return this.moveAdviser.triggerAdvice(coords)
  }
  return player
}
