'use strict'

const CellsGrouping = require('./CellsGrouping')

module.exports = {
  rowGrouping(matrix, rowIndex) {
    return new CellsGrouping(matrix.getRow(rowIndex))
  },

  columnGrouping(matrix, columnIndex) {
    return new CellsGrouping(matrix.getColumn(columnIndex))
  },

  leftDiagonalGrouping(matrix){
    return new CellsGrouping(matrix.getLeftDiagonal())
  },

  rightDiagonalGrouping(matrix){
    return new CellsGrouping(matrix.getRightDiagonal())
  }
}

