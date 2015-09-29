'use strict'

const _ = require('lodash')

module.exports = class ImmutableMatrix {
  constructor(source) {
    this.source = source
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
    return this.get(coords[0], coords[1])
  }

  get(rowIndex, columnIndex) {
    return this.source[rowIndex][columnIndex]
  }

  getRow(rowIndex) {
    return this.source[rowIndex]
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

function copyArray(array) {
  return [].concat(array)
}
