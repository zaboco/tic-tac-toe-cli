'use strict'

module.exports = class OngoingStatus {
  performOneOf(possibleActions) {
    return possibleActions.ongoing()
  }

  static check() {
    return new OngoingStatus()
  }
}
