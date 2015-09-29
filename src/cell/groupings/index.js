'use strict'

const CellsGrouping = require('./CellsGrouping')

module.exports = {
  rowGrouping(matrix, rowIndex) {
    return new CellsGrouping(matrix.getRow(rowIndex))
  }
}

