'use strict'

const _ = require('lodash')

const BoardError = require('./BoardError'),
  BoardAnalyzer = require('./BoardAnalyzer'),
  WinnerBoard = require('./WinnerBoard'),
  ImmutableMatrix = require('./../matrix/ImmutableMatrix'),
  MatrixError = require('./../matrix/MatrixError'),
  emptyCell = require('./../cell/index').empty(),
  CellError = require('./../cell/index').CellError

const SIZE = 3

module.exports = class Board {
  constructor(matrix) {
    this.matrix = matrix
  }

  getSignAt(coords) {
    return this._getCellAt(coords).getSign()
  }

  isEmptyAt(coords) {
    return this._getCellAt(coords).isEmpty()
  }

  fillCell(coords, sign) {
    try {
      return this._unsafeFillCell(coords, sign)
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

  _unsafeFillCell(coords, sign) {
    const oldCell = this._getCellAt(coords),
      newCell = oldCell.fillWith(sign),
      newMatrix = this._setCellAt(coords, newCell),
      hasWinner = BoardAnalyzer.checkWinnerFor(newMatrix)
    return hasWinner ? new WinnerBoard() : new Board(newMatrix)
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
    return false
  }

  static empty() {
    return new Board(ImmutableMatrix.ofSize(SIZE, emptyCell))
  }
}
