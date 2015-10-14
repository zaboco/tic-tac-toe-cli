'use strict'

module.exports = class TableStructure {
  constructor(formatter) {
    this.formatter = formatter
  }

  format(matrix) {
    let formattedRows = matrix.allRows().map(this._formatRow.bind(this))
    let allRows = this._addBordersTo(formattedRows)
    return this.formatter.matrix(allRows)
  }

  _addBordersTo(rows) {
    var length = rowLength(rows)
    let rowSeparator = this.formatter.separator(length)
    let topBorder = this.formatter.topBorder(length)
    return topBorder.insertBefore(interleave(rows, rowSeparator))
  }

  _formatRow(row, rowIndex) {
    var formattedItems = row.map(it => this.formatter.item(it))
    return this.formatter.row(formattedItems, rowIndex)
  }
}

function interleave(array, separator) {
  let head = array[0], tail = array.slice(1)
  return tail.reduce((extendedArray, item) => {
    return extendedArray.concat(separator.insertBefore([item]))
  }, [head])
}

function rowLength(formattedRows) {
  return formattedRows[0].getBodyLength()
}
