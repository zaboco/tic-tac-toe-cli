'use strict'

module.exports = SmartSolver

const ChoiceOptimizer = require('./ChoiceOptimizer')

function SmartSolver(board, sign) {
  return ChoiceOptimizer(board, sign).bestChoice().getCoords()
}
