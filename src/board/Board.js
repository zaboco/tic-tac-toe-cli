'use strict'

const _ = require('lodash')

const BoardError = require('./BoardError'),
  WinnerBoard = require('./WinnerBoard'),
  ImmutableMatrix = require('./../matrix/ImmutableMatrix'),
  MatrixError = require('./../matrix/MatrixError'),
  emptyCell = require('./../cell/index').empty(),
  CellError = require('./../cell/index').CellError

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
      const newMatrix = this._setCellAt(coords, oldCell.fillWith(sign))
      let isWinner = this._checkWinner(newMatrix)
      return isWinner ? new WinnerBoard() : new Board(newMatrix)
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
    return false
  }

  _checkWinner(matrix) {
    var anyRowIsWinner = _.any([0, 1, 2], (rowIndex) => this._rowHasSameSign(rowIndex, matrix)),
      anyColumnIsWinner = _.any([0, 1, 2], (columnIndex) => this._columnHasSameSign(columnIndex, matrix))
    return anyRowIsWinner || anyColumnIsWinner || this._leftDiagonalHasSameSign(matrix)
  }

  _rowHasSameSign(rowIndex, matrix) {
    const rowCells = matrix.getRow(rowIndex),
      firstCellFromRow = rowCells[0]
    return _.all(rowCells, (cell) => cell.sameAs(firstCellFromRow))
  }

  _columnHasSameSign(columnIndex, matrix) {
    const columnCells = matrix.getColumn(columnIndex),
      firstCellFromColumn = columnCells[0]
    return _.all(columnCells, (cell) => cell.sameAs(firstCellFromColumn))
  }

  _leftDiagonalHasSameSign(matrix) {
    const leftDiagonalCells = matrix.getLeftDiagonal(),
      firstCellFromDiagonal = leftDiagonalCells[0]
    return _.all(leftDiagonalCells, (cell) => cell.sameAs(firstCellFromDiagonal))
  }

  static empty() {
    return new Board(ImmutableMatrix.ofSize(SIZE, emptyCell))
  }
}
