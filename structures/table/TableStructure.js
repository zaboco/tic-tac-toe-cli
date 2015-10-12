'use strict'

module.exports = class TableStructure {
  constructor(formatter) {
    this.formatter = formatter
  }

  format(matrix) {
    let formattedRows = matrix.allRows().map(this._formatRow.bind(this))
    return this.formatter.matrix(formattedRows)
  }

  _formatRow(row, rowIndex) {
    var formattedItems = row.map(it => this.formatter.item(it))
    return this.formatter.row(formattedItems, rowIndex)
  }
}
