'use strict'

const _ = require('lodash')

module.exports = class SimpleTableFormat {
  constructor(settings) {
    _.defaults(this, settings, {
      padding: 0,
      horizontalSeparator: '',
      verticalSeparator: ' '
    })
  }

  matrix(matrixRows) {
    return matrixRows.join('\n')
  }

  separator(rowLength) {
    return _.repeat(this.horizontalSeparator, rowLength)
  }

  row(rowItems) {
    return rowItems.join(this.verticalSeparator)
  }

  item(item) {
    let itemAsString = item.toString()
    let spaceForItem = itemAsString.length + this.padding * 2
    return _.pad(itemAsString, spaceForItem)
  }
}
