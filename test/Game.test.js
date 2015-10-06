'use strict'

require('chai').should()

const Game = require('../src/Game'),
  Player = require('../src/Player'),
  ManualMoveAdviser = require('./ManualMoveAdviser')

suite('Game', function() {
  this.timeout(100)

  let game, players
  setup(() => {
    players = [makePlayer('X'), makePlayer('O')]
    game = new Game(players)
  })

  suite('on run', () => {
    test('the game starts', done => {
      game.on('game.start', done)
      game.run()
    })

    suite('first round starts', () => {
      test('with first player', done => {
        game.on('round.start', currentPlayer => {
          currentPlayer.should.equal(players[0])
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

  suite('after player chooses coords', () => {
    const someCoords = [0, 0]
    let currentPlayer
    setup(() => {
      currentPlayer = players[0]
      game.run()
    })

    suite('first round ends', () => {
      test('with current player', done => {
        game.on('round.end', player => {
          player.should.equal(currentPlayer)
          done()
        })
        currentPlayer.chooseCoords(someCoords)
      })

      test('with chosen coords', done => {
        game.on('round.end', (__, coords) => {
          coords.should.equal(someCoords)
          done()
        })
        currentPlayer.chooseCoords(someCoords)
      })
    })

    suite('second round starts', () => {
      test('with the other player', done => {
        let otherPlayer = players[1]
        game.on('round.start', currentPlayer => {
          currentPlayer.should.equal(otherPlayer)
          done()
        })
        currentPlayer.chooseCoords(someCoords)
      })

      test('with the updated board', done => {
        game.on('round.start', (__, board) => {
          board.getSignAt(someCoords).should.equal(currentPlayer.sign)
          done()
        })
        currentPlayer.chooseCoords(someCoords)
      })
    })
  })
})

function makePlayer(sign) {
  const player = new Player(sign, new ManualMoveAdviser())
  player.chooseCoords = function(coords) {
    this.moveAdviser.triggerAdvice(coords)
  }
  return player
}
