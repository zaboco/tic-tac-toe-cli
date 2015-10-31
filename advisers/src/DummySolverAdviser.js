'use strict'

module.exports = DummySolverAdviser

function DummySolverAdviser() {
  return function chooseCoords(board) {
    var firstEmptyCell = board.emptyCells()[0]
    return Promise.resolve(firstEmptyCell.positionAsCoords())
  }
}
