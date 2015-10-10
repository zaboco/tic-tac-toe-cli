'use strict'

const Position = require('./Position'),
  emptyCell = require('../emptyCell')

module.exports = class PositionedCell {
  constructor(cell, position) {
    this.cell = cell
    this.position = position
  }

  isEmpty() {
    return this.cell.isEmpty()
  }

  getSign() {
    return this.cell.getSign()
  }

  fillWith(sign) {
    return new PositionedCell(this.cell.fillWith(sign), this.position)
  }

  sameAs(other) {
    return this.cell.sameAs(other.cell)
  }

  toString() {
    return this.cell.toString()
  }

  positionAsCoords() {
    return this.position.toArray()
  }

  static emptyAt(coords) {
    return new PositionedCell(emptyCell, Position.fromArray(coords))
  }
}
