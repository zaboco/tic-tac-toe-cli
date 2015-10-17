'use strict'

require('chai').should()

const Board = require('../../../core').Board,
  CoordsValidator = require('../src/CoordsValidator')

suite('validateCoords', () => {
  let validateCoords
  setup(() => {
    let boardWithTopLeft = Board.prefilled.fromRow(['X'])
    validateCoords = CoordsValidator(boardWithTopLeft)
  })

  test('returns true for empty cell inside the board', () => {
    validateCoords([0, 1]).should.be.true
  })

  test('returns error message if coords are outside the board', () => {
    validateCoords([5, 1]).should.match(/outside.*the.*board/i)
  })

  test('returns another error message if the cell is not empty', () => {
    validateCoords([0, 0]).should.match(/cell.*not.*empty/i)
  })
})
