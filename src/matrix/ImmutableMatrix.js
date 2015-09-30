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
    if (this._anyCoordsOutside(coords)) {
      throw MatrixError.invalidCoords(coords)
    }
    return this.get(coords[0], coords[1])
  }

  get(rowIndex, columnIndex) {
    return this.source[rowIndex][columnIndex]
  }

  getRow(rowIndex) {
    return this.source[rowIndex]
  }

  getColumn(columnIndex) {
    return _.pluck(this.source, columnIndex)
  }

  getLeftDiagonal() {
    return [0, 1, 2].map((index) => this.get(index, index))
  }

  getRightDiagonal() {
    return [0, 1, 2].map((index) => this.get(index, 2 - index))
  }

  countIf(predicate) {
    return _.filter(this.allItems(), predicate).length
  }

  allItems() {
    return _.flatten(this.source)
  }

  _anyCoordsOutside(coords) {
    const validCoordRange = [0, this.size - 1]
    return _.any(coords, (coord) => outsideRange(validCoordRange, coord))
  }

  _cloneSource() {
    return this.source.map(copyArray)
  }

  static ofSize(size, value) {
    const emptyRow = _.range(size).map(() => value),
      emptyMatrix = _.range(size).map(() => emptyRow)
    return new ImmutableMatrix(emptyMatrix)
  }
}

function outsideRange(range, value) {
  return value < range[0] || value > range[1]
}

function copyArray(array) {
  return [].concat(array)
}
