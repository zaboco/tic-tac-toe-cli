'use strict'

const _ = require('lodash')

const BoardError = require('./BoardError'),
  ImmutableMatrix = require('./ImmutableMatrix')

const SIZE = 3,
  EMPTY_CELL_SIGN = ' '

module.exports = class Board {
  constructor(matrix) {
    this.matrix = matrix
  }

  getSignAt(coords) {
    if (Board._anyCoordsOutside(coords)) {
      throw BoardError.CellOutsideBoard()
    }
    return this.matrix.getAtCoords(coords)
  }

  isEmptyAt(coords) {
    return this.getSignAt(coords) === EMPTY_CELL_SIGN
  }

  fillCell(coords, sign) {
    if (!this.isEmptyAt(coords)) {
      throw BoardError.CellNotEmpty(coords)
    }
    return new Board(this.matrix.setAtCoords(coords, sign))
  }

  hasWinner() {
    return _.any([0, 1, 2], (rowIndex) => this._rowHasSameSign(rowIndex))
  }

  _rowHasSameSign(rowIndex) {
    const firstRowSigns = this.matrix.getRow(rowIndex),
      targetSign = firstRowSigns[0]
    if (targetSign === EMPTY_CELL_SIGN) {
      return false
    }
    return _.all(firstRowSigns, (sign) => sign === targetSign)
  }

  static _anyCoordsOutside(coords) {
    return _.any(coords, (coord) => outsideRange(Board._validCoordRange(), coord))
  }

  static _validCoordRange() {
    return [0, SIZE - 1]
  }

  static empty() {
    return new Board(ImmutableMatrix.ofSize(SIZE, EMPTY_CELL_SIGN))
  }
}

function outsideRange(range, value) {
  return value < range[0] || value > range[1]
}
