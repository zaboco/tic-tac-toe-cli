'use strict'

const _ = require('lodash')

const BoardError = require('./BoardError'),
  ImmutableMatrix = require('./matrix/ImmutableMatrix'),
  MatrixError = require('./matrix/MatrixError'),
  emptyCell = require('./cell').empty(),
  CellError = require('./cell').CellError

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
      if (err instanceof CellError.AlreadyFilledError) {
        throw BoardError.cellNotEmpty(coords)
      } else {
        throw err
      }
    }
  }

  _getCellAt(coords) {
    try {
      return this.matrix.getAtCoords(coords)
    }
    catch (err) {
      if (err instanceof MatrixError.InvalidCoords) {
        throw BoardError.cellOutsideBoard()
      } else {
        throw err
      }
    }
  }

  _setCellAt(coords, cell) {
    return this.matrix.setAtCoords(coords, cell)
  }

  hasWinner() {
    var anyRowIsWinner = _.any([0, 1, 2], (rowIndex) => this._rowHasSameSign(rowIndex)),
      anyColumnIsWinner = _.any([0, 1, 2], (columnIndex) => this._columnHasSameSign(columnIndex))
    return anyRowIsWinner || anyColumnIsWinner
  }

  _rowHasSameSign(rowIndex) {
    const rowCells = this.matrix.getRow(rowIndex),
      firstCellFromRow = rowCells[0]
    return _.all(rowCells, (cell) => cell.sameAs(firstCellFromRow))
  }

  _columnHasSameSign(columnIndex) {
    const columnCells = this.matrix.getColumn(columnIndex),
      firstCellFromColumn = columnCells[0]
    return _.all(columnCells, (cell) => cell.sameAs(firstCellFromColumn))
  }

  static empty() {
    return new Board(ImmutableMatrix.ofSize(SIZE, emptyCell))
  }
}
