'use strict'

const CellsGrouping = require('./CellsGrouping')

module.exports = {
  rowGrouping(matrix, rowIndex) {
    return new CellsGrouping(matrix.getRow(rowIndex))
  },

  _rowGrouping(index) {
    return matrix => new CellsGrouping(matrix.getRow(index))
  },

  columnGrouping(matrix, columnIndex) {
    return new CellsGrouping(matrix.getColumn(columnIndex))
  },

  _columnGrouping(index) {
    return matrix => new CellsGrouping(matrix.getColumn(index))
  },

  leftDiagonalGrouping(matrix){
    return new CellsGrouping(matrix.getLeftDiagonal())
  },

  _diagonalGrouping(direction) {
    return direction === 'left' ?
      matrix => new CellsGrouping(matrix.getLeftDiagonal()) :
      matrix => new CellsGrouping(matrix.getRightDiagonal())
  },

  rightDiagonalGrouping(matrix){
    return new CellsGrouping(matrix.getRightDiagonal())
  }
}

