'use strict'

module.exports = class NumericHeader {
  constructor(startingIndex) {
    this.startingIndex = (startingIndex != null) ? startingIndex : 1
  }

  fromIndex(index) {
    return this.startingIndex + index
  }

  toIndex(headerNumber) {
    return headerNumber - this.startingIndex
  }
}
