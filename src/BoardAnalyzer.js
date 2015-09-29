'use strict'

const _ = require('lodash')

module.exports = class {
  constructor(matrix) {
    this.matrix = matrix
  }

  static checkWinnerFor(matrix) {
    const boardAnalyzer = new this(matrix)
    return boardAnalyzer.checkWinner()
  }

  checkWinner() {
    var anyRowIsWinner = _.any([0, 1, 2], (rowIndex) => this._rowHasSameSign(rowIndex)),
      anyColumnIsWinner = _.any([0, 1, 2], (columnIndex) => this._columnHasSameSign(columnIndex))
    return anyRowIsWinner || anyColumnIsWinner || this._leftDiagonalHasSameSign()
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

  _leftDiagonalHasSameSign() {
    const leftDiagonalCells = this.matrix.getLeftDiagonal(),
      firstCellFromDiagonal = leftDiagonalCells[0]
    return _.all(leftDiagonalCells, (cell) => cell.sameAs(firstCellFromDiagonal))
  }
}
