'use strict'

const _ = require('lodash')

const cellGroupings = require('./../cell/groupings/index')

module.exports = class {
  constructor(matrix) {
    this.matrix = matrix
    this.winner = this._checkForWinner()
    this.tie = !this.winner && this._isFull()
  }

  _checkForWinner() {
    const groupings = this._makeGroupings()
    return _.any(groupings, grouping => grouping.isWinner())
  }

  isWinner() {
    return this.winner
  }

  isTie() {
    return this.tie
  }

  _isFull() {
    var emptyCellsCount = this.matrix.countIf(cell => cell.isEmpty())
    return emptyCellsCount === 0
  }

  _makeGroupings() {
    return [].concat(
      this._makeRowGroupings(),
      this._makeColumnGroupings(),
      this._makeDiagonalGroupings()
    )
  }

  _makeRowGroupings() {
    return [0, 1, 2].map(index => cellGroupings.rowGrouping(this.matrix, index))
  }

  _makeColumnGroupings() {
    return [0, 1, 2].map(index => cellGroupings.columnGrouping(this.matrix, index))
  }

  _makeDiagonalGroupings() {
    return [].concat(
      cellGroupings.leftDiagonalGrouping(this.matrix),
      cellGroupings.rightDiagonalGrouping(this.matrix)
    )
  }
}
