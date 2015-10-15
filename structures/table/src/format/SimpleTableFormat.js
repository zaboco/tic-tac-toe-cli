'use strict'

const _ = require('lodash')

const FormattedRow = require('../structure/FormattedRow'),
  CustomTableFormat = require('./CustomTableFormat')

module.exports = class SimpleTableFormat {
  constructor(settings) {
    _.defaults(this, settings, {
      padding: 0,
      verticalSeparator: ' ',
      border: {}
    })
  }

  topBorder(rowLength) {
    return this._formatBorder('top', rowLength)
  }

  bottomBorder(rowLength) {
    return this._formatBorder('bottom', rowLength)
  }

  innerBorder(rowLength) {
    return this._formatBorder('inner', rowLength)
  }

  _formatBorder(type, rowLength) {
    let borderBody = _.repeat(this.border[type], rowLength)
    return new FormattedRow({ body: borderBody })
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

  addModifier(modifier) {
    return new CustomTableFormat(this, modifier)
  }

  withHorizontalBorders(borderSymbols) {
    let newSettings = {
      padding: this.padding,
      verticalSeparator: this.verticalSeparator,
      border: Object.assign({}, this.border, borderSymbols)
    }
    return new SimpleTableFormat(newSettings)
  }
}
