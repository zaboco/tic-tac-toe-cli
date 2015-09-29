'use strict'

const _ = require('lodash')

const cellGroupings = require('./cell/groupings')

module.exports = class {
  constructor(matrix) {
    this.matrix = matrix
    this.groupings = this._makeGroupings()
  }

  static checkWinnerFor(matrix) {
    const boardAnalyzer = new this(matrix)
    return boardAnalyzer.checkWinner()
  }

  checkWinner() {
    return _.any(this.groupings, grouping => grouping.isWinner())
  }

  _makeGroupings() {
    return [].concat(
      this._makeRowGroupings(),
      this._makeColumnGroupings(),
      this._makeLeftDiagonalGrouping()
    )
  }

  _makeRowGroupings() {
    return [0, 1, 2].map(index => cellGroupings.rowGrouping(this.matrix, index))
  }

  _makeColumnGroupings() {
    return [0, 1, 2].map(index => cellGroupings.columnGrouping(this.matrix, index))
  }

  _makeLeftDiagonalGrouping() {
    return cellGroupings.leftDiagonalGrouping(this.matrix)
  }
}
