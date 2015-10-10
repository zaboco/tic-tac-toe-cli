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

  allItems() {
    return _.flatten(this.source)
  }

  format(settings) {
    settings = settings != null ? settings : {}
    let formattedRows = this.source.map(row => this._formatRow(row, settings))
    let firstRowLength = formattedRows[0].length,
      extraRowSeparator = _.repeat(settings.horizontalSeparator, firstRowLength)
    let rowSeparator = extraRowSeparator === '' ? '\n' : `\n${extraRowSeparator}\n`
    return formattedRows.join(rowSeparator)
  }

  _formatRow(row, settings) {
    let formattedRowItems = row.map(it => this._formatItem(it, settings))
    return formattedRowItems.join(settings.verticalSeparator || ' ')
  }

  _formatItem(item, settings) {
    let itemAsString = item.toString()
    let spaceForItem = itemAsString.length + settings.padding * 2
    return _.pad(itemAsString, spaceForItem)
  }

  _anyCoordsOutside(coords) {
    const validCoordRange = [0, this.size - 1]
    return _.any(coords, (coord) => outsideRange(validCoordRange, coord))
  }

  _cloneSource() {
    return this.source.map(copyArray)
  }

  /* istanbul ignore next */
  toString() {
    return this.source.map(row => row.join('|')).join(' : ')
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
