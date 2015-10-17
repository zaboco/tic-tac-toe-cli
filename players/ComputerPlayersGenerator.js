'use strict'

const AutomaticMoveAdviser = require('../advisers/automatic'),
  Player = require('../core').Player

module.exports = ComputerPlayersGenerator

function ComputerPlayersGenerator(algorithm) {
  return class ComputerPlayer {
    constructor(sign) {
      this.name = sign
      this.gamePlayer = makeGamePlayer(sign, algorithm)
    }

    willChooseCoordsFor(board) {
      return this.gamePlayer.willChooseCoordsFor(board)
    }

    fillCellOnBoard(board) {
      return this.gamePlayer.fillCellOnBoard(board)
    }

    toString() {
      return `${this.sign} [AI]`
    }
  }
}

function makeGamePlayer(sign, algorithm) {
  let moveAdviser = new AutomaticMoveAdviser(algorithm)
  return new Player(sign, moveAdviser)
}
