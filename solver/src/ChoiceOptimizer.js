'use strict'

module.exports = ChoiceOptimizer

const Choice = require('./Choice')

function ChoiceOptimizer(board, sign) {
  function bestChoice() {
    return board.emptyCells()
      .map(it => it.positionAsCoords())
      .reduce((bestChoiceSoFar, coords) => {
        if (bestChoiceSoFar.isBest()) {
          return bestChoiceSoFar
        }
        let currentChoice = choiceWithBestOutcome(coords)
        return bestChoiceSoFar.orBetter(currentChoice)
      }, Choice.worst())
  }

  function choiceWithBestOutcome(coords) {
    if (board.isFinished()) {
      throw Error('No move can be made, the game has already finished')
    }
    let newBoard = board.fillCellAt(coords, sign)
    return newBoard.performOnStatus({
      win: () => Choice.best(coords),
      tie: () => Choice.neutral(coords),
      ongoing: () => {
        let opponentBestChoice = ChoiceOptimizer(newBoard, otherSign(sign)).bestChoice()
        return opponentBestChoice.negate(coords)
      }
    })
  }

  function bestOutcomeWhenChoosing(coords) {
    return choiceWithBestOutcome(coords).getOutcome()
  }

  return { bestOutcomeWhenChoosing, bestChoice }
}

function otherSign(sign) {
  return sign === 'X' ? 'O' : 'X'
}
