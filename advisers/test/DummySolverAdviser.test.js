'use strict'

require('chai').should()

const wco = require('co').wrap

const DummySolverAdviser = require('../src/DummySolverAdviser'),
  Board = require('../../core').Board

suite('advisers/dummySolver', () => {
  const X = 'X', O = 'O'
  const dummySolver = DummySolverAdviser()

  test('chooses top-left on empty board', wco(function*() {
    const topLeft = [0, 0]
    let coordsForEmptyBoard = yield dummySolver(Board.empty())
    coordsForEmptyBoard.should.eql(topLeft)
  }))

  test('chooses top-middle if top-left is taken', wco(function*() {
    const topMiddle = [0, 1]
    let coordsWhenTopLeftFilled = yield dummySolver(Board.prefilled.fromRow([X]))
    coordsWhenTopLeftFilled.should.eql(topMiddle)
  }))

  test('chooses middle-left when first row is full', wco(function*() {
    const middleLeft = [1, 0]
    let coordsWhenFirstRowFull = yield dummySolver(Board.prefilled.fromRow([X, O, X]))
    coordsWhenFirstRowFull.should.eql(middleLeft)
  }))
})
