'use strict'

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
    const oldCell = this._getCellAt(coords)
    try {
      const newMatrix = this._setCellAt(coords, oldCell.fillWith(sign))
      let hasWinner = BoardAnalyzer.checkWinnerFor(newMatrix)
      return hasWinner ? new WinnerBoard() : new Board(newMatrix)
    }
    catch (err) {
      if (err instanceof CellError.AlreadyFilledError) {
        throw BoardError.cellNotEmpty(coords)
      } else {
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
    return false
  }

  static empty() {
    return new Board(ImmutableMatrix.ofSize(SIZE, emptyCell))
  }
}
