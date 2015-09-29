'use strict'

const _ = require('lodash')

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
      throw new Error()
    }
    return this.get(coords[0], coords[1])
  }

  get(rowIndex, columnIndex) {
    return this.source[rowIndex][columnIndex]
  }

  getRow(rowIndex) {
    return this.source[rowIndex]
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

function _anyCoordsOutside(coords) {
  return _.any(coords, (coord) => outsideRange(Board._validCoordRange(), coord))
}

function outsideRange(range, value) {
  return value < range[0] || value > range[1]
}

function copyArray(array) {
  return [].concat(array)
}
