'use strict'

module.exports = class DummyMoveAdviser {
  coordsFor(board) {
    let emptyCells = board.findCells(it => it.isEmpty())
    return emptyCells[0].positionAsCoords()
  }
}
