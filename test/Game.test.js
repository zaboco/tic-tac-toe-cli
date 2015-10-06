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

    test('the first round starts with first player', done => {
      game.emitter.on('round.start', currentPlayer => {
        currentPlayer.should.equal(players[0])
        done()
      })
      game.run()
    })

    test('the first round starts with empty board', done => {
      game.emitter.on('round.start', (__, board) => {
        board.isEmpty().should.be.true
        done()
      })
      game.run()
    })
  })
})

function makePlayer(sign) {
  const player = new Player(sign, new ManualMoveAdviser())
  player.chooseCoords = function(coords) {
    this.moveAdviser.setNextAdvice(coords)
  }
  return player
}
