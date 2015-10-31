'use strict'

module.exports = SmartSolverAdviser

const solver = require('../../solver')

function SmartSolverAdviser() {
  return function chooseCoords(board, sign) {
    return Promise.resolve(solver(board, sign))
  }
}
