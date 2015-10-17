'use strict'

require('chai').should()

const dummyAlgorithm = require('../src/algorithms/dummyAlgorithm'),
  Board = require('../../../core').Board

suite('advisers/dummy', () => {
  const X = 'X', O = 'O'
  const findBestMoveFor = dummyAlgorithm.findBestMoveFor

  test('chooses top-left on empty board', () => {
    const topLeft = [0, 0]
    let emptyBoard = Board.empty()
    findBestMoveFor(emptyBoard).should.eql(topLeft)
  })

  test('chooses top-middle if top-left is taken', () => {
    const topMiddle = [0, 1]
    let boardWithTopLeftFilled = Board.prefilled.fromRow([X])
    findBestMoveFor(boardWithTopLeftFilled).should.eql(topMiddle)
  })

  test('chooses middle-left when first row is full', () => {
    const middleLeft = [1, 0]
    let boardWithFirstRowFull = Board.prefilled.fromRow([X, O, X])
    findBestMoveFor(boardWithFirstRowFull).should.eql(middleLeft)
  })
})
