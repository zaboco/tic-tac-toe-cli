'use strict'

require('chai').should()

const Game = require('../src/Game'),
  Player = require('../src/Player'),
  ManualMoveAdviser = require('../../advisers/manual')

suite('Game', function() {
  this.timeout(100)

  let game, firstPlayer, secondPlayer
  setup(() => {
    firstPlayer = makePlayer('X')
    secondPlayer = makePlayer('O')
    game = new Game([firstPlayer, secondPlayer])
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

    setup(() => {
      game.run()
      return firstPlayer.chooseCoords(firstCoords)
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
})

function makePlayer(sign) {
  const player = new Player(sign, new ManualMoveAdviser())
  player.chooseCoords = function(coords) {
    return this.moveAdviser.triggerAdvice(coords)
  }
  return player
}
