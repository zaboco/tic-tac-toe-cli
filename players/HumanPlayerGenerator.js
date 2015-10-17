'use strict'

const _ = require('lodash')

const InteractiveMoveAdviser = require('../advisers/interactive/index'),
  Player = require('../core/index').Player

module.exports = HumanPlayersGenerator

function HumanPlayersGenerator(inputProcessor) {
  return class HumanPlayer {
    constructor(sign, name) {
      this.name = makeName(sign, name)
      this.gamePlayer = makeGamePlayer(sign, inputProcessor)
    }

    willChooseCoordsFor(board) {
      return this.gamePlayer.willChooseCoordsFor(board)
    }

    fillCellOnBoard(board) {
      return this.gamePlayer.fillCellOnBoard(board)
    }

    toString() {
      return `${this.name} [H]`
    }
  }
}

function makeName(sign, name) {
  return (_.isEmpty(name)) ? sign : `${name} (${sign})`
}

function makeGamePlayer(sign, inputProcessor) {
  let moveAdviser = new InteractiveMoveAdviser(inputProcessor)
  return new Player(sign, moveAdviser)
}
