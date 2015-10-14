'use strict'

const _ = require('lodash')

const FormattedRow = require('./FormattedRow')

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
    var separatorBody = _.repeat(this.horizontalSeparator, rowLength)
    return new FormattedRow({ body: separatorBody })
  }

  row(rowItems) {
    let rowBody = rowItems.join(this.verticalSeparator)
    return new FormattedRow({ body: rowBody })
  }

  item(item) {
    let itemAsString = item.toString()
    let spaceForItem = itemAsString.length + this.padding * 2
    return _.pad(itemAsString, spaceForItem)
  }
}
