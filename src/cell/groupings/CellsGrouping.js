'use strict'

const _ = require('lodash')

module.exports = class CellsGrouping {
  constructor(cells) {
    this.cells = cells
  }

  isWinner() {
    return _.all(this._allCells(), (cell) => cell.sameAs(this._firstCell()))
  }

  _firstCell() {
    return this.cells[0]
  }

  _allCells() {
    return this.cells
  }
}
