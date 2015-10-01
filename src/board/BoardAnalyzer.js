'use strict'

const _ = require('lodash')

const cellGroupings = require('../cell/groupings'),
  groupsMaker = require('../cell/groupings/GroupsMaker')

module.exports = class {
  constructor(matrix) {
    this.matrix = matrix
    this.winner = this._checkForWinner()
    this.tie = !this.winner && this._isFull()
  }

  _checkForWinner() {
    const groupings = groupsMaker.from(this.matrix)
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
}
