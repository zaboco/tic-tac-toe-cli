'use strict'

const _ = require('lodash')

module.exports = class HeaderColumnAdder {
  constructor(header) {
    this.header = header
  }

  modifyInnerBorder(innerBorder) {
    return this._indentRow(innerBorder)
  }

  modifyRow(row, rowIndex) {
    let paddedHeader = HeaderColumnAdder.padItem(this.header.fromIndex(rowIndex))
    return row.prepend(paddedHeader)
  }

  modifyOuterBorder(topBorder) {
    return this._indentRow(topBorder)
  }

  modifyHeaderRow(header) {
    return this._indentRow(header)
  }

  _indentRow(row) {
    return row.prepend(HeaderColumnAdder.padItem(''))
  }

  static padItem(item) {
    return _.pad(item, HeaderColumnAdder.width)
  }

  static get width() {
    return 2
  }
}
