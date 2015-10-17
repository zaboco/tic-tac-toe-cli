'use strict'

const InteractiveMoveAdviser = require('../advisers/interactive/index'),
  Player = require('../core/index').Player

module.exports = HumanPlayersGenerator

function HumanPlayersGenerator(inputProcessor) {
  return class HumanPlayer {
    constructor(sign, name) {
      this.sign = sign
      this.name = name
      this.gamePlayer = makeGamePlayer(sign, inputProcessor)
    }

    willChooseCoordsFor(board) {
      return this.gamePlayer.willChooseCoordsFor(board)
    }

    fillCellOnBoard(board) {
      return this.gamePlayer.fillCellOnBoard(board)
    }

    toString() {
      return `${this.name}(${this.sign}) [H]`
    }
  }
}

function makeGamePlayer(sign, inputProcessor) {
  let moveAdviser = new InteractiveMoveAdviser(inputProcessor)
  return new Player(sign, moveAdviser)
}
