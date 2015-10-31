'use strict'

exports.WIN = {
  negate: () => exports.LOSS,
  isBetterThan: () => true
}

exports.LOSS = {
  negate: () => exports.WIN,
  isBetterThan: () => false
}

exports.TIE = {
  negate: () => exports.TIE,
  isBetterThan: otherOutcome => {
    return otherOutcome !== exports.TIE ?
      !otherOutcome.isBetterThan(exports.TIE) :
      false
  }
}
