'use strict'

const _ = require('lodash')

module.exports = class CellsGrouping {
  constructor(cells) {
    this.cells = cells
  }

  isWinner() {
    return _.all(this._tail(), (cell) => cell.sameAs(this._head()))
  }

  _head() {
    return this.cells[0]
  }

  _tail() {
    return this.cells.slice(1)
  }
}
