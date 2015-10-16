'use strict'

require('chai').should()

const Board = require('../../../core').Board,
  validateCoords = require('../src/validateCoords')

suite('validateCoords', () => {
  let boardWithTopLeft
  setup(() => {
    boardWithTopLeft = Board.prefilled.fromRow(['X'])
  })

  test('returns true for empty cell inside the board', () => {
    validateCoords([0, 1], boardWithTopLeft).should.be.true
  })

  test('returns error message if coords are outside the board', () => {
    validateCoords([5, 1], boardWithTopLeft).should.match(/outside.*the.*board/i)
  })

  test('returns another error message if the cell is not empty', () => {
    validateCoords([0, 0], boardWithTopLeft).should.match(/cell.*not.*empty/i)
  })
})
