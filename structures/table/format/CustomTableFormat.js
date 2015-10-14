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
    var originalTopBorder = this.tableFormat.topBorder(rowLength)
    return this.tableModifier.modifyTopBorder(originalTopBorder)
  }

  innerBorder(rowLength) {
    let originalInnerBorder = this.tableFormat.innerBorder(rowLength)
    return this.tableModifier.modifyInnerBorder(originalInnerBorder)
  }

  row(rowItems) {
    let originalRow = this.tableFormat.row(rowItems)
    return this.tableModifier.modifyRow(originalRow)
  }

  item(item) {
    return this.tableFormat.item(item)
  }
}
