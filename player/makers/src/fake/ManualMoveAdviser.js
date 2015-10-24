'use strict'

const Messenger = require('../../../../util').Messenger

module.exports = ManualMoveAdviser

function ManualMoveAdviser() {
  let move = Messenger.empty()
  let finished = Messenger.empty()

  function sendCoords(coords) {
    return new Promise(resolve => {
      move = move.send(coords)
      finished = finished.onReceive(resolve)
    })
  }

  function chooseCoords() {
    return new Promise(resolve => {
      finished = finished.send()
      move = move.onReceive(resolve)
    })
  }

  chooseCoords.trigger = sendCoords
  return chooseCoords
}
