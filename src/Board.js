'use strict'

const _ = require('lodash')

const BoardError = require('./BoardError')

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
    return this.matrix[coords[0]][coords[1]]
  }

  isEmptyAt(coords) {
    return this.getSignAt(coords) === EMPTY_CELL_SIGN
  }

  fillCell(coords, sign) {
    if (!this.isEmptyAt(coords)) {
      throw BoardError.CellNotEmpty(coords)
    }
    return new Board(newMatrixWithValueAt(this.matrix, coords, sign))
  }

  static _anyCoordsOutside(coords) {
    return _.any(coords, (coord) => outsideRange(Board._validCoordRange(), coord))
  }

  static _validCoordRange() {
    return [0, SIZE - 1]
  }

  static empty() {
    const emptyRow = _.range(SIZE).map(() => EMPTY_CELL_SIGN),
      emptyArray = _.range(SIZE).map(() => emptyRow)
    return new Board(emptyArray)
  }
}

function newMatrixWithValueAt(matrix, coords, value) {
  let newMatrix = copyMatrix(matrix)
  setMatrixValueAt(newMatrix, coords, value)
  return newMatrix
}

function copyMatrix(matrix) {
  return matrix.map((row) => copyArray(row))
}

function copyArray(array) {
  return [].concat(array)
}

function setMatrixValueAt(matrix, coords, value) {
  matrix[coords[0]][coords[1]] = value
}

function outsideRange(range, value) {
  return value < range[0] || value > range[1]
}
