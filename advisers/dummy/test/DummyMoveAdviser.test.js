'use strict'

require('chai').should()

const DummyMoveAdviser = require('../src/DummyMoveAdviser'),
  Board = require('../../../core').Board

suite('advisers/dummy', () => {
  const X = 'X', O = 'O'
  let dummyAdviser
  setup(() => {
    dummyAdviser = new DummyMoveAdviser()
  })

  test('chooses top-left on empty board', () => {
    const topLeft = [0, 0]
    let emptyBoard = Board.empty()
    dummyAdviser.coordsFor(emptyBoard).should.eql(topLeft)
  })

  test('chooses top-middle if top-left is taken', () => {
    const topMiddle = [0, 1]
    let boardWithTopLeftFilled = Board.prefilled.fromRow([X])
    dummyAdviser.coordsFor(boardWithTopLeftFilled).should.eql(topMiddle)
  })

  test('chooses middle-left when first row is full', () => {
    const middleLeft = [1, 0]
    let boardWithFirstRowFull = Board.prefilled.fromRow([X, O, X])
    dummyAdviser.coordsFor(boardWithFirstRowFull).should.eql(middleLeft)
  })
})
