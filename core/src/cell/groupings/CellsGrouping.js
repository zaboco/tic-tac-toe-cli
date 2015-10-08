'use strict'

const _ = require('lodash')

module.exports = class CellsGrouping {
  constructor(cells) {
    this.cells = cells
    this.hasSameCells = this._allCellsAreTheSame()
  }

  _allCellsAreTheSame() {
    return _.all(this._tail(), (cell) => cell.sameAs(this._head()))
  }

  isWinner() {
    return this.hasSameCells
  }

  commonSign() {
    return this.hasSameCells && this._head().sign
  }

  _head() {
    return this.cells[0]
  }

  _tail() {
    return this.cells.slice(1)
  }
}
