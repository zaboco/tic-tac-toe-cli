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
  })
  suite('first round', () => {
    suite('starts', () => {
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

    suite('ends', () => {
      const someCoords = [0, 0]
      let expectedPlayer
      setup(() => {
        expectedPlayer = players[0]
      })

      function playerChoosesCoords(coords) {
        game.run()
        expectedPlayer.chooseCoords(coords)
      }

      test('when the player chooses coords', done => {
        game.on('round.end', () => { done() })
        playerChoosesCoords(someCoords)
      })

      test('with current player', done => {
        game.on('round.end', currentPlayer => {
          currentPlayer.should.equal(players[0])
          done()
        })
        playerChoosesCoords(someCoords)
      })

      test('with chosen coords', done => {
        game.on('round.end', (__, coords) => {
          coords.should.equal(someCoords)
          done()
        })
        playerChoosesCoords(someCoords)
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
