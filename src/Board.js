'use strict'

const _ = require('lodash')

const BoardError = require('./BoardError'),
  ImmutableMatrix = require('./matrix/ImmutableMatrix'),
  emptyCell = require('./cell').empty()

const SIZE = 3

module.exports = class Board {
  constructor(matrix) {
    this.matrix = matrix
  }

  getSignAt(coords) {
    return this._getCellAt(coords).getSign()
  }

  isEmptyAt(coords) {
    return this._getCellAt(coords).isEmpty()
  }

  fillCell(coords, sign) {
    const oldCell = this._getCellAt(coords)
    try {
      return new Board(this._setCellAt(coords, oldCell.fillWith(sign)))
    }
    catch (err) {
      throw BoardError.CellNotEmpty(coords)
    }
  }

  _getCellAt(coords) {
    try {
      return this.matrix.getAtCoords(coords)
    }
    catch (err) {
      throw BoardError.CellOutsideBoard()
    }
  }

  _setCellAt(coords, cell) {
    return this.matrix.setAtCoords(coords, cell)
  }

  hasWinner() {
    return _.any([0, 1, 2], (rowIndex) => this._rowHasSameSign(rowIndex))
  }

  _rowHasSameSign(rowIndex) {
    const rowCells = this.matrix.getRow(rowIndex),
      firstCellFromRow = rowCells[0]
    return _.all(rowCells, (cell) => cell.sameAs(firstCellFromRow))
  }

  static empty() {
    return new Board(ImmutableMatrix.ofSize(SIZE, emptyCell))
  }
}
