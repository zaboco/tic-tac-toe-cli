'use strict'

const _ = require('lodash')

const BoardError = require('./BoardError'),
  groupsMaker = require('../cell/groupings/groupsMaker'),
  ImmutableMatrix = require('../matrix/ImmutableMatrix'),
  MatrixError = require('../matrix/MatrixError'),
  Cell = require('../cell'),
  CellError = require('../cell').CellError

const SIZE = 3

module.exports = class Board {
  constructor(matrix) {
    this.matrix = matrix
    this.cells = matrix.allItems()
    this.winningSign = winningSignIfAny(this.matrix)
  }

  isFinished() {
    return this.hasWinner() || this.hasTie()
  }

  hasWinner() {
    return this.getWinningSign() != null
  }

  getWinningSign() {
    return this.winningSign
  }

  hasTie() {
    return !this.winningSign && !this.emptyCells().length
  }

  mapMatrix(fn) {
    return this.matrix.map(fn)
  }

  emptyCells() {
    return this._findCells(it => it.isEmpty())
  }

  filledCells() {
    return this._findCells(it => !it.isEmpty())
  }

  _findCells(predicate) {
    return _.filter(this.cells, predicate)
  }

  getSignAt(coords) {
    return this._getCellAt(coords).getSign()
  }

  isEmptyAt(coords) {
    return this._getCellAt(coords).isEmpty()
  }

  areCoordsOutside(coords) {
    return this.matrix.areCoordsOutside(coords)
  }

  fillCellAt(coords, sign) {
    const newMatrix = this._makeNewMatrixByFilling(coords, sign)
    return new Board(newMatrix)
  }

  _makeNewMatrixByFilling(coords, sign) {
    try {
      const newCell = this._getCellAt(coords).fillWith(sign)
      return this._setCellAt(coords, newCell)
    }
    catch (err) {
      if (err instanceof CellError.AlreadyFilledError) {
        throw BoardError.cellNotEmpty(coords)
      }
      else {
        throw err
      }
    }
  }

  _getCellAt(coords) {
    try {
      return this.matrix.getAtCoords(coords)
    }
    catch (err) { /* istanbul ignore else */
      if (err instanceof MatrixError.InvalidCoords) {
        throw BoardError.cellOutsideBoard()
      } else {
        throw err
      }
    }
  }

  _setCellAt(coords, cell) {
    return this.matrix.setAtCoords(coords, cell)
  }

  inspect() {
    return this.matrix.inspect()
  }

  formatWith(formatter) {
    return this.matrix.formatWith(formatter)
  }

  static empty() {
    let matrix = ImmutableMatrix.make(SIZE, (i, j) => Cell.emptyAt([i, j]))
    return new Board(matrix)
  }
}

function winningSignIfAny(matrix) {
  let groupings = groupsMaker.from(matrix)
  let winningGrouping = groupings.find(it => it.isWinner())
  return winningGrouping && winningGrouping.commonSign()
}
