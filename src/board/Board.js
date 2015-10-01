'use strict'

const _ = require('lodash')

const BoardError = require('./BoardError'),
  BoardAnalyzer = require('./BoardAnalyzer'),
  groupsMaker = require('../cell/groupings/groupsMaker'),
  ImmutableMatrix = require('../matrix/ImmutableMatrix'),
  MatrixError = require('../matrix/MatrixError'),
  emptyCell = require('../cell').empty(),
  CellError = require('../cell').CellError

const SIZE = 3

module.exports = class Board {
  constructor(matrix) {
    this.matrix = matrix
    this.groupings = groupsMaker.from(matrix)
    this.cells = matrix.allItems()
    this.status = this.analyzeStatus()
  }

  analyzeStatus() {
    const boardAnalyzer = new BoardAnalyzer()
    return boardAnalyzer.statusFor(this)
  }

  findGroupings(predicate) {
    return _.filter(this.groupings, predicate)
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

  fillCell(coords, sign) {
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
    catch (err) {
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

  hasWinner() {
    return this.status === 'winner'
  }

  hasTie() {
    return this.status === 'tie'
  }

  static empty() {
    return new Board(ImmutableMatrix.ofSize(SIZE, emptyCell))
  }
}
