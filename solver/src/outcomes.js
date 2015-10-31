'use strict'

exports.WIN = {
  negate: () => exports.LOSS,
  isBetterThan: () => true,
  id: 'WIN'
}

exports.LOSS = {
  negate: () => exports.WIN,
  isBetterThan: () => false,
  id: 'LOSS'
}

exports.TIE = {
  negate: () => exports.TIE,
  isBetterThan: otherOutcome => {
    return otherOutcome !== exports.TIE ?
      !otherOutcome.isBetterThan(exports.TIE) :
      false
  },
  id: 'TIE'
}
