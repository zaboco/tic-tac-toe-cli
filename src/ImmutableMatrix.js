'use strict'

const _ = require('lodash')

module.exports = class ImmutableMatrix {
  constructor(source) {
    this.source = source
  }

  setAtCoords(coords, value) {
    return this.set(coords[0], coords[1], value)
  }

  set(row, column, value) {
    const sourceClone = this._cloneSource()
    sourceClone[row][column] = value
    return new ImmutableMatrix(sourceClone)
  }

  getAtCoords(coords) {
    return this.get(coords[0], coords[1])
  }

  get(row, column) {
    return this.source[row][column]
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
