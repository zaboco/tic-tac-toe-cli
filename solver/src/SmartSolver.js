'use strict'

module.exports = SmartSolver

const ChoiceOptimizer = require('./ChoiceOptimizer')

function SmartSolver() {
  return function chooseBestCoords(board, sign) {
    return ChoiceOptimizer(board, sign).bestChoice().getCoords()
  }
}
