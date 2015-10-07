'use strict'

const Board = require('../../src/board')

exports.fromMatrix = function prefillBoardFromMatrix(matrix) {
  return matrix.reduce(fillFromRow, Board.empty())
}

exports.fromRow = function prefillBoardFromRow(row, index) {
  return fillFromRow(Board.empty(), row, index || 0)
}

exports.fromColumn = function prefillBoardFromRow(column, index) {
  return fillFromColumn(Board.empty(), column, index || 0)
}

function fillFromRow(board, row, rowIndex) {
  return row.reduce((board, sign, columnIndex) => {
    return board.fillCell([rowIndex, columnIndex], sign)
  }, board)
}

function fillFromColumn(board, column, columnIndex) {
  return column.reduce((board, sign, rowIndex) => {
    return board.fillCell([rowIndex, columnIndex], sign)
  }, board)
}
