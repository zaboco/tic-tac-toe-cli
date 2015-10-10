'use strict'

const _ = require('lodash')

module.exports = class TableFormatter {
  constructor(settings) {
    _.defaults(this, settings, {
      padding: 0,
      horizontalSeparator: '',
      verticalSeparator: ' '
    })
  }

  formatMatrix(matrixRows) {
    let rowLength = matrixRows[0].length
    let extraRowSeparator = _.repeat(this.horizontalSeparator, rowLength)
    let rowSeparator = extraRowSeparator === '' ? '\n' : `\n${extraRowSeparator}\n`
    return matrixRows.join(rowSeparator)
  }

  formatRow(rowItems) {
    return rowItems.join(this.verticalSeparator)
  }

  formatItem(item) {
    let itemAsString = item.toString()
    let spaceForItem = itemAsString.length + this.padding * 2
    return _.pad(itemAsString, spaceForItem)
  }
}
