'use strict'

const _ = require('lodash')

const MatrixError = require('./MatrixError')

module.exports = class ImmutableMatrix {
  constructor(source) {
    this.source = source
    this.size = source.length
  }

  setAtCoords(coords, value) {
    return this.set(coords[0], coords[1], value)
  }

  set(rowIndex, columnIndex, value) {
    const sourceClone = this._cloneSource()
    sourceClone[rowIndex][columnIndex] = value
    return new ImmutableMatrix(sourceClone)
  }

  getAtCoords(coords) {
    if (this.areCoordsOutside(coords)) {
      throw MatrixError.invalidCoords(coords)
    }
    return this.get(coords[0], coords[1])
  }

  get(rowIndex, columnIndex) {
    return this.getRow(rowIndex)[columnIndex]
  }

  getRow(rowIndex) {
    return this.allRows()[rowIndex]
  }

  getColumn(columnIndex) {
    return _.pluck(this.allRows(), columnIndex)
  }

  getLeftDiagonal() {
    return [0, 1, 2].map((index) => this.get(index, index))
  }

  getRightDiagonal() {
    return [0, 1, 2].map((index) => this.get(index, 2 - index))
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

  _cloneSource() {
    return this.allRows().map(copyArray)
  }

  /* istanbul ignore next */
  toString() {
    return this.allRows().map(row => row.join('|')).join(' : ')
  }

  allRows() {
    return this.source
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

function copyArray(array) {
  return [].concat(array)
}
