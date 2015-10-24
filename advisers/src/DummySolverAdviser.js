'use strict'

module.exports = DummySolverAdviser

function DummySolverAdviser() {
  return function chooseCoords(board) {
    let emptyCells = board.findCells(it => it.isEmpty())
    return emptyCells[0].positionAsCoords()
  }
}
