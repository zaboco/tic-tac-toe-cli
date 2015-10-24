'use strict'

module.exports = ManualAdviser

function ManualAdviser(confirmedMessenger) {
  return function chooseCoords() {
    return confirmedMessenger.wait()
  }
}
