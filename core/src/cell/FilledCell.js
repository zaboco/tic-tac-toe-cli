'use strict'

const CellError = require('./CellError')

module.exports = class FilledCell {
  constructor(sign) {
    this.sign = sign
  }

  isEmpty() {
    return false
  }

  getSign() {
    return this.sign
  }

  sameAs(otherCell) {
    if (otherCell.isEmpty()) {
      return false
    }
    return this.sign === otherCell.sign
  }

  fillWith() {
    throw CellError.alreadyFilled(this.sign)
  }

  toString() {
    return `${this.sign}`
  }
}
