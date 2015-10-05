'use strict'

require('chai').should()

const Game = require('../src/Game'),
  Player = require('../src/Player'),
  StaticMoveAdviser = require('./StaticMoveAdviser')

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
  })
})

function makePlayer(sign) {
  const player = new Player(sign, new StaticMoveAdviser())
  player.willMove = function(coords) {
    this.staticMoveAdviser.setNextAdvice(coords)
  }
  return player
}
