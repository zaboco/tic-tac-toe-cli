'use strict'

const WIN = 1, TIE = 0, LOSS = -1

module.exports = class Choice {
  constructor(outcome, coords) {
    this.outcome = outcome
    this.coords = coords
  }

  negatedOutcome() {
    return negate(this.outcome)
  }

  orBetter(otherChoice) {
    let hasBetterOutcome = isBetter(this.outcome, otherChoice.outcome)
    return hasBetterOutcome ? this : otherChoice
  }

  static get worst() {
    return new Choice(LOSS)
  }
}

function isBetter(oneOutcome, otherOutcome) {
  return oneOutcome > otherOutcome
}

function negate(outcome) {
  return -outcome
}
