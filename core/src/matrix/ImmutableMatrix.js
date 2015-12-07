'use strict'

const _ = require('lodash')

const MatrixError = require('./MatrixError')

module.exports = class ImmutableMatrix {
  constructor(source) {
    this.source = source
    this.size = source.length
  }

  setAtCoords(coords, newValue) {
    return this.map((oldValue, rowIndex, columnIndex) => {
      return coords[0] === rowIndex && coords[1] === columnIndex ? newValue : oldValue
    })
  }

  getAtCoords(coords) {
    if (this.areCoordsOutside(coords)) {
      throw MatrixError.invalidCoords(coords)
    }
    return this.getRow(coords[0])[coords[1]]
  }

  getRow(rowIndex) {
    return this.allRows()[rowIndex]
  }

  getColumn(columnIndex) {
    return _.pluck(this.allRows(), columnIndex)
  }

  getLeftDiagonal() {
    return [0, 1, 2].map((index) => this._get(index, index))
  }

  getRightDiagonal() {
    return [0, 1, 2].map((index) => this._get(index, 2 - index))
  }

  _get(rowIndex, columnIndex) {
    return this.getRow(rowIndex)[columnIndex]
  }

  allItems() {
    return _.flatten(this.allRows())
  }

  formatWith(formatter) {
    return formatter(this)
  }

  areCoordsOutside(coords) {
    const validCoordRange = [0, this.size - 1]
    return _.any(coords, (coord) => outsideRange(validCoordRange, coord))
  }

  inspect() {
    return this.allRows().map(row => row.join('|')).join(' : ')
  }

  allRows() {
    return this.source
  }

  map(fn) {
    let newSource = this.source.map((row, rowIndex) => {
      return row.map((item, columnIndex) => fn(item, rowIndex, columnIndex))
    })
    return new ImmutableMatrix(newSource)
  }

  static make(size, iterator) {
    let matrix = _.range(size).map(i => {
      return _.range(size).map(j => iterator(i, j))
    })
    return new ImmutableMatrix(matrix)
  }
}

function outsideRange(range, value) {
  return value < range[0] || value > range[1]
}
