'use strict'

const BoardError = require('../BoardError')

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
    throw Error
  }
}