'use strict'

module.exports = class ComposedModifier {
  constructor(firstModifier, secondModifier) {
    this.first = firstModifier
    this.second = secondModifier
  }

  modifyInnerBorder(innerBorder) {
    return this._applySimpleModifiers('modifyInnerBorder', innerBorder)
  }

  modifyRow(row, rowIndex) {
    return this.second.modifyRow(this.first.modifyRow(row, rowIndex), rowIndex)
  }

  modifyOuterBorder(topBorder) {
    return this._applySimpleModifiers('modifyOuterBorder', topBorder)
  }

  modifyHeaderRow(header) {
    return this._applySimpleModifiers('modifyHeaderRow', header)
  }

  _applySimpleModifiers(methodName, arg) {
    let argAfterFirstModifier = this.first[methodName](arg)
    return this.second[methodName](argAfterFirstModifier)
  }
}
