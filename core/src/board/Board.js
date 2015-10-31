'use strict'

const _ = require('lodash')

const BoardError = require('./BoardError'),
  statuses = require('../statuses'),
  groupsMaker = require('../cell/groupings/groupsMaker'),
  ImmutableMatrix = require('../matrix/ImmutableMatrix'),
  MatrixError = require('../matrix/MatrixError'),
  Cell = require('../cell'),
  CellError = require('../cell').CellError

const SIZE = 3

module.exports = class Board {
  constructor(matrix) {
    this.matrix = matrix
    this.groupings = groupsMaker.from(matrix)
    this.cells = matrix.allItems()
    this.status = statuses.from(this)
  }

  performOnStatus(possibleActions) {
    return this.status.performOneOf(possibleActions)
  }

  findGroupings(predicate) {
    return _.filter(this.groupings, predicate)
  }

  isEmpty() {
    const filledCells = this.findCells(it => !it.isEmpty())
    return filledCells.length === 0
  }

  emptyCells() {
    return this.findCells(it => it.isEmpty())
  }

  findCells(predicate) {
    return _.filter(this.cells, predicate)
  }

  getSignAt(coords) {
    return this._getCellAt(coords).getSign()
  }

  isEmptyAt(coords) {
    return this._getCellAt(coords).isEmpty()
  }

  isFinished() {
    return this.performOnStatus({
      win: () => true,
      tie: () => true,
      ongoing: () => false
    })
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

  hasWinner(wantedSign) {
    return this.performOnStatus({
      win: winningSign => winningSign === wantedSign,
      tie: () => false,
      ongoing: () => false
    })
  }

  toString() {
    return this.matrix.toString()
  }

  formatWith(formatter) {
    return this.matrix.formatWith(formatter)
  }

  static empty() {
    let matrix = ImmutableMatrix.make(SIZE, (i, j) => Cell.emptyAt([i, j]))
    return new Board(matrix)
  }
}
