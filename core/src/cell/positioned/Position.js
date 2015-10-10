'use strict'

module.exports = class Position {
  constructor(row, column) {
    this.row = row
    this.column = column
  }

  toArray() {
    return [this.row, this.column]
  }

  static fromArray(coords) {
    return new Position(coords[0], coords[1])
  }
}
