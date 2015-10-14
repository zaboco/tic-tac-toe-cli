'use strict'

module.exports = class TableBorderAdder {
  constructor(settings) {
    this.left = settings.left || ''
    this.right = settings.right || ''
  }

  modifyInnerBorder(innerBorder) {
    return this._modifyGenericRow(innerBorder)
  }

  modifyRow(row) {
    return this._modifyGenericRow(row)
  }

  _modifyGenericRow(genericRow) {
    return genericRow.prepend(this.left).append(this.right)
  }
}
