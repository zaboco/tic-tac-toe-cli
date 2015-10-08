'use strict'

const PseudoStatus = require('./PseudoStatus')

module.exports = class TieStatus {
  performOneOf(possibleActions) {
    return possibleActions.tie()
  }

  or() {
    return this
  }

  static check(board) {
    var emptyCells = board.findCells(cell => cell.isEmpty())
    if (!emptyCells.length) {
      return new TieStatus()
    }
    return new PseudoStatus()
  }
}
