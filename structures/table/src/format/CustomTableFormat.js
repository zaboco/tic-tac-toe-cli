'use strict'

module.exports = class CustomTableFormat {
  constructor(tableFormat, tableModifier) {
    this.tableFormat = tableFormat
    this.tableModifier = tableModifier
  }

  headerRow(rowLength) {
    let originalHeader = this.tableFormat.headerRow(rowLength)
    return this.tableModifier.modifyHeaderRow(originalHeader)
  }

  topBorder(rowLength) {
    return this._modifyOuterBorder('topBorder', rowLength)
  }

  bottomBorder(rowLength) {
    return this._modifyOuterBorder('bottomBorder', rowLength)
  }

  _modifyOuterBorder(borderMethodName, rowLength) {
    let originalBorder = this.tableFormat[borderMethodName](rowLength)
    return this.tableModifier.modifyOuterBorder(originalBorder)
  }

  innerBorder(rowLength) {
    let originalInnerBorder = this.tableFormat.innerBorder(rowLength)
    return this.tableModifier.modifyInnerBorder(originalInnerBorder)
  }

  row(rowItems, rowIndex) {
    let originalRow = this.tableFormat.row(rowItems)
    return this.tableModifier.modifyRow(originalRow, rowIndex)
  }

  item(item) {
    return this.tableFormat.item(item)
  }
}
