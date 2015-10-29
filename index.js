'use strict'

const registry = require('./registry')
const GameRunner = require('./runner')

let gameRunner = GameRunner(registry.playerMaker, registry.boardFormatter)
gameRunner().catch(err => {
  console.error(err.stack)
})
