'use strict'

const _ = require('lodash')

const cellGroupings = require('./cell/groupings')

module.exports = class {
  constructor(matrix) {
    this.matrix = matrix
  }

  static checkWinnerFor(matrix) {
    const boardAnalyzer = new this(matrix)
    return boardAnalyzer.checkWinner()
  }

  checkWinner() {
    const rowGroupings = [0, 1, 2].map(index => cellGroupings.rowGrouping(this.matrix, index))
    var anyRowIsWinner = _.any(rowGroupings, grouping => grouping.isWinner()),
      anyColumnIsWinner = _.any([0, 1, 2], (columnIndex) => this._columnHasSameSign(columnIndex))
    return anyRowIsWinner || anyColumnIsWinner || this._leftDiagonalHasSameSign()
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
