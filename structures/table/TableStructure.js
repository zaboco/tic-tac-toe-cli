'use strict'

const _ = require('lodash')

module.exports = class TableStructure {
  constructor(formatter) {
    this.formatter = formatter
  }

  format(matrix) {
    let formattedRows = matrix.allRows().map(this._formatRow.bind(this))
    let rowSeparator = this.formatter.separator(rowLength(formattedRows))
    let allRows = interleave(formattedRows, rowSeparator)
    return this.formatter.matrix(allRows)
  }

  _formatRow(row, rowIndex) {
    var formattedItems = row.map(it => this.formatter.item(it))
    return this.formatter.row(formattedItems, rowIndex)
  }
}

function interleave(array, separator) {
  let head = array[0], tail = array.slice(1)
  return tail.reduce((extendedArray, item) => {
    return extendedArray.concat(_.compact([separator, item]))
  }, [head])
}

function rowLength(formattedRows) {
  return formattedRows[0].length
}
