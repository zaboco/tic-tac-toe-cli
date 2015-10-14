'use strict'

const _ = require('lodash')

const FormattedRow = require('./../structure/FormattedRow')

module.exports = class SimpleTableFormat {
  constructor(settings) {
    _.defaults(this, settings, {
      padding: 0,
      verticalSeparator: ' ',
      border: {
        top: '',
        inner: ''
      }
    })
  }

  matrix(matrixRows) {
    return matrixRows.join('\n')
  }

  topBorder(rowLength) {
    var borderBody = _.repeat(this.border.top, rowLength)
    return new FormattedRow({ body: borderBody })
  }

  innerBorder(rowLength) {
    var separatorBody = _.repeat(this.border.inner, rowLength)
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
