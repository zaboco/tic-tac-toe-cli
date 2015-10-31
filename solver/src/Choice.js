'use strict'

const outcomes = require('./outcomes')

module.exports = class Choice {
  constructor(outcome, coords) {
    this.outcome = outcome
    this.coords = coords
  }

  getOutcome() {
    return this.outcome
  }

  negate() {
    return new Choice(this.outcome.negate(), this.coords)
  }

  orBetter(otherChoice) {
    return otherChoice.hasOutcomeBetterThan(this.outcome) ? otherChoice : this
  }

  hasOutcomeBetterThan(otherOutcome) {
    return this.outcome.isBetterThan(otherOutcome)
  }

  static get best() {
    return new Choice(outcomes.WIN)
  }

  static get neutral() {
    return new Choice(outcomes.TIE)
  }

  static get worst() {
    return new Choice(outcomes.LOSS)
  }
}
