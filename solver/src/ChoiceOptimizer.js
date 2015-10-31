'use strict'

module.exports = ChoiceOptimizer

const Choice = require('./Choice')

const WIN = 1, TIE = 0, LOSS = -1

function ChoiceOptimizer(board, sign) {
  function bestChoice() {
    return board.emptyCells()
      .map(it => it.positionAsCoords())
      .reduce((bestChoiceSoFar, coords) => {
        let currentChoice = new Choice(bestOutcomeWhenChoosing(coords), coords)
        return bestChoiceSoFar.orBetter(currentChoice)
      }, Choice.worst)
  }

  function bestOutcomeWhenChoosing(coords) {
    if (board.isFinished()) {
      throw Error('No move can be made, the game has already finished')
    }
    let newBoard = board.fillCellAt(coords, sign)
    return newBoard.performOnStatus({
      win: () => WIN,
      tie: () => TIE,
      ongoing: () => {
        let opponentBestChoice = ChoiceOptimizer(newBoard, otherSign(sign)).bestChoice()
        return opponentBestChoice.negatedOutcome()
      }
    })
  }

  return { bestOutcomeWhenChoosing, bestChoice }
}

function otherSign(sign) {
  return sign === 'X' ? 'O' : 'X'
}
