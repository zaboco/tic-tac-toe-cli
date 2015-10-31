'use strict'

module.exports = ChoiceOptimizer

const Choice = require('./Choice')

function ChoiceOptimizer(board, sign) {
  function bestChoice() {
    let emptyLocations = board.emptyCells().map(it => it.positionAsCoords())
    return immediateWinner(emptyLocations) || _chooseBestFromAllMoves(emptyLocations)
  }

  function _chooseBestFromAllMoves(locations) {
    return locations.reduce((bestChoiceSoFar, coords) => {
      if (bestChoiceSoFar.isBest()) {
        return bestChoiceSoFar
      }
      let currentChoice = choiceWithBestOutcome(coords)
      return bestChoiceSoFar.orBetter(currentChoice)
    }, Choice.worst())
  }

  function immediateWinner(locations) {
    let winningLocation = locations.find(isImmediateWinner)
    return winningLocation && Choice.best(winningLocation)
  }

  function isImmediateWinner(coords) {
    let newBoard = board.fillCellAt(coords, sign)
    return newBoard.hasWinner(sign)
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
