'use strict'

module.exports = class CustomTableFormat {
  constructor(tableFormat, tableModifier) {
    this.tableFormat = tableFormat
    this.tableModifier = tableModifier
  }

  matrix(matrixRows) {
    return this.tableFormat.matrix(matrixRows)
  }

  topBorder(rowLength) {
    return this.tableFormat.topBorder(rowLength)
  }

  separator(rowLength) {
    let originalSeparator = this.tableFormat.separator(rowLength)
    return this.tableModifier.modifySeparator(originalSeparator)
  }

  row(rowItems) {
    let originalRow = this.tableFormat.row(rowItems)
    return this.tableModifier.modifyRow(originalRow)
  }

  item(item) {
    return this.tableFormat.item(item)
  }
}
