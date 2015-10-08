'use strict'

const PseudoStatus = require('./PseudoStatus')

module.exports = class WinStatus {
  constructor(sign) {
    this.sign = sign
  }

  performOneOf(possibleActions) {
    return possibleActions.win(this.sign)
  }

  or() {
    return this
  }

  static check(board) {
    const winningGrouping = findWinningGrouping(board)
    if (winningGrouping) {
      return new WinStatus(winningGrouping.commonSign())
    }
    return new PseudoStatus()
  }
}

function findWinningGrouping(board) {
  const winningGroupings = board.findGroupings(it => it.isWinner())
  return winningGroupings[0]
}
