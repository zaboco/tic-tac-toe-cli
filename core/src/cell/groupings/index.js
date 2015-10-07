'use strict'

const CellsGrouping = require('./CellsGrouping')

module.exports = {
  row(index) {
    return makeGrouper('getRow', index)
  },

  column(index) {
    return makeGrouper('getColumn', index)
  },

  diagonal(direction) {
    return direction === 'left' ? makeGrouper('getLeftDiagonal') : makeGrouper('getRightDiagonal')
  }
}

function makeGrouper(matrixMethod, arg) {
  return matrix => new CellsGrouping(matrix[matrixMethod](arg))
}
