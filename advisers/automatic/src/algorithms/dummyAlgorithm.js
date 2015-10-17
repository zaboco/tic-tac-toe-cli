'use strict'

module.exports = { findBestMoveFor }

function findBestMoveFor(board) {
  let emptyCells = board.findCells(it => it.isEmpty())
  return emptyCells[0].positionAsCoords()
}
