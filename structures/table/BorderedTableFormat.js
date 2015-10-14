'use strict'

module.exports = class BorderedTableFormat {
  constructor(tableFormat, borderSettings) {
    this.tableFormat = tableFormat
    this.borderSettings = borderSettings
  }

  matrix(matrixRows) {
    return this.tableFormat.matrix(matrixRows)
  }

  separator(rowLength) {
    return this.tableFormat.separator(rowLength).prepend(this.borderSettings.left)
  }

  row(rowItems) {
    return this.tableFormat.row(rowItems).prepend('|')
  }

  item(item) {
    return this.tableFormat.item(item)
  }
}
