'use strict'

module.exports = GameRunner

const co = require('co')

const Game = require('../core').Game

function GameRunner(playerMaker, boardFormatter) {
  return co.wrap(function* run() {
    let players = yield makeBothPlayers(playerMaker)
    let game = new Game(players)
    game.on('game.start', () => {
      console.log('The game starts now!')
    })
    game.on('round.start', player => {
      console.log(`\nIt is ${player}'s turn:`)
    })
    game.on('round.end', (player, board) => {
      console.log(`${player} has moved:`)
      console.log(board.formatWith(boardFormatter))
    })
    game.on('game.won', player => {
      console.log(`${player} wins!`)
    })
    game.on('game.tie', () => {
      console.log(`The game ends with a tie!`)
    })
    game.run()
  })
}

function makeBothPlayers(playerMaker) {
  return co(function*() {
    let firstPlayer = yield playerMaker('X')
    let secondPlayer = yield playerMaker('O')
    return [firstPlayer, secondPlayer]
  })
}

