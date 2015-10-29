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
    game.on('round.start', (player, board) => {
      console.log(`\nIt is ${player}'s turn:`)
      console.log(board.formatWith(boardFormatter))
    })
    game.on('round.end', (player, coords) => {
      console.log(`${player} has moved at ${coords}`)
    })
    game.on('game.won', (player, board) => {
      console.log(`${player} wins!`)
      console.log(board.formatWith(boardFormatter))
    })
    game.on('game.tie', board => {
      console.log(`The game ends with a tie!`)
      console.log(board.formatWith(boardFormatter))
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

