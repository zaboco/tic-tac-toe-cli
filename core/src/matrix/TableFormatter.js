'use strict'

const _ = require('lodash')

module.exports = class TableFormatter {
  constructor(settings) {
    settings = settings != null ? settings : {}
    this.padding = settings.padding
    this.verticalSeparator = settings.verticalSeparator
    this.horizontalSeparator = settings.horizontalSeparator
  }

  formatMatrix(matrixRows, rowLength) {
    let extraRowSeparator = _.repeat(this.horizontalSeparator, rowLength)
    let rowSeparator = extraRowSeparator === '' ? '\n' : `\n${extraRowSeparator}\n`
    return matrixRows.join(rowSeparator)
  }

  formatRow(rowItems) {
    return rowItems.join(this.verticalSeparator || ' ')
  }

  formatItem(item) {
    let itemAsString = item.toString()
    let spaceForItem = itemAsString.length + this.padding * 2
    return _.pad(itemAsString, spaceForItem)
  }
}
