'use strict'

module.exports = class TableBorderAdder {
  constructor(settings) {
    this.left = settings.left || ''
    this.right = settings.right || ''
    this.leftMargin = ' '.repeat(this.left.length)
  }

  modifyInnerBorder(innerBorder) {
    return this._modifyInnerRow(innerBorder)
  }

  modifyRow(row) {
    return this._modifyInnerRow(row)
  }

  modifyOuterBorder(topBorder) {
    return topBorder.prepend(this.leftMargin)
  }

  modifyHeaderRow(header) {
    return header.prepend(this.leftMargin)
  }

  _modifyInnerRow(genericRow) {
    return genericRow.prepend(this.left).append(this.right)
  }
}
