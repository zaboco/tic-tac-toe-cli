'use strict'

require('chai').should()

const DummySolverAdviser = require('../src/DummySolverAdviser'),
  Board = require('../../core').Board

suite('advisers/dummySolver', () => {
  const X = 'X', O = 'O'
  const dummySolver = DummySolverAdviser()

  test('chooses top-left on empty board', () => {
    const topLeft = [0, 0]
    let emptyBoard = Board.empty()
    dummySolver(emptyBoard).should.eql(topLeft)
  })

  test('chooses top-middle if top-left is taken', () => {
    const topMiddle = [0, 1]
    let boardWithTopLeftFilled = Board.prefilled.fromRow([X])
    dummySolver(boardWithTopLeftFilled).should.eql(topMiddle)
  })

  test('chooses middle-left when first row is full', () => {
    const middleLeft = [1, 0]
    let boardWithFirstRowFull = Board.prefilled.fromRow([X, O, X])
    dummySolver(boardWithFirstRowFull).should.eql(middleLeft)
  })
})
