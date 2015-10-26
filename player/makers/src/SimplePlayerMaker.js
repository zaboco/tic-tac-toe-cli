'use strict'

module.exports = SimplePlayerMaker

const Player = require('../../../core').Player

function SimplePlayerMaker(adviser) {
  return function makePlayer(sign) {
    return Promise.resolve(new Player(sign, adviser))
  }
}
