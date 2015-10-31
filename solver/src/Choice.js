'use strict'

const outcomes = require('./outcomes')

module.exports = class Choice {
  constructor(outcome, coords, stack) {
    this.outcome = outcome
    this.coords = coords || []
    this.stack = [coords].concat(stack || [])
  }

  getCoords() {
    return this.stack[0]
  }

  getOutcome() {
    return this.outcome
  }

  negate(coords) {
    return new Choice(this.outcome.negate(), coords, this.stack)
  }

  orBetter(otherChoice) {
    return this.outcome.isBetterThan(otherChoice.outcome) ? this : otherChoice
  }

  toString() {
    return `${this.outcome.id} (${this.stack.join(' : ')})`
  }

  static best(coords) {
    return new Choice(outcomes.WIN, coords)
  }

  static neutral(coords) {
    return new Choice(outcomes.TIE, coords)
  }

  static worst(coords) {
    return new Choice(outcomes.LOSS, coords)
  }
}
