'use strict'

module.exports = class {
  statusFor(board) {
    const statuses = [
      winnerIfAnyGroupingIsWinner,
      tieIfFull,
      partialOtherwise
    ].map(checker => checker(board))
    return statuses.reduce((result, status) => result || status)
  }
}

function winnerIfAnyGroupingIsWinner(board) {
  const winningGroupings = board.findGroupings(it => it.isWinner())
  if (winningGroupings.length) {
    return 'winner'
  }
}

function tieIfFull(board) {
  var emptyCells = board.findCells(cell => cell.isEmpty())
  if (!emptyCells.length) {
    return 'tie'
  }
}

function partialOtherwise() {
  return 'partial'
}
