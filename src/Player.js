'use strict'

const wco = require('co').wrap

module.exports = Player

function Player(sign, moveAdviser) {
  return {
    fillCellOnBoard: wco(function* (board) {
      const coords = yield moveAdviser.coordsFor(board, sign)
      return board.fillCell(coords, sign)
    })
  }
}
