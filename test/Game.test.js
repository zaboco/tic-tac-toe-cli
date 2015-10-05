'use strict'

const _ = require('lodash')

require('chai').should()

const Game = require('../src/Game'),
  Player = require('../src/Player'),
  StaticMoveAdviser = require('./StaticMoveAdviser')

suite('Game', function() {
  this.timeout(100)

  let game, players
  setup(() => {
    players = {
      X: makePlayer('X'),
      O: makePlayer('O')
    }
    game = new Game(_.values(players))
  })

  suite('on run', () => {
    test('the game starts', done => {
      game.on('game.start', done)
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
