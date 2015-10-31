'use strict'

module.exports = ChoiceOptimizer

const WIN = 1, TIE = 0, LOSS = -1

function ChoiceOptimizer(board, sign) {
  function bestChoice() {
    return board.emptyCells().reduce((bestOutcomeSoFar, cell) => {
      let currentOutcome = bestOutcomeWhenChoosing(cell.positionAsCoords())
      if (isBetter(currentOutcome, bestOutcomeSoFar)) {
        bestOutcomeSoFar = currentOutcome
      }
      return bestOutcomeSoFar
    }, LOSS)
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
        return negate(opponentBestChoice)
      }
    })
  }

  return { bestOutcomeWhenChoosing, bestChoice}
}

function isBetter(oneOutcome, otherOutcome) {
  return oneOutcome > otherOutcome
}

function negate(outcome) {
  return -outcome
}

function otherSign(sign) {
  return sign === 'X' ? 'O' : 'X'
}
