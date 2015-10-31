'use strict'

const WIN = 1, TIE = 0, LOSS = -1

module.exports = class Choice {
  constructor(outcome, coords) {
    this.outcome = outcome
    this.coords = coords
  }

  getOutcome() {
    return this.outcome
  }

  negate() {
    return new Choice(negateOutcome(this.outcome), this.coords)
  }

  orBetter(otherChoice) {
    let hasBetterOutcome = isBetter(this.outcome, otherChoice.outcome)
    return hasBetterOutcome ? this : otherChoice
  }

  static get best() {
    return new Choice(WIN)
  }

  static get neutral() {
    return new Choice(TIE)
  }

  static get worst() {
    return new Choice(LOSS)
  }
}

function isBetter(oneOutcome, otherOutcome) {
  return oneOutcome > otherOutcome
}

function negateOutcome(outcome) {
  return -outcome
}
