'use strict'

require('chai').should()

const DummyMoveAdviser = require('../src/DummyMoveAdviser'),
  Board = require('../../../core').Board

suite('advisers/dummy', () => {
  let dummyAdviser
  setup(() => {
    dummyAdviser = new DummyMoveAdviser()
  })

  test('chooses top left on empty board', () => {
    const topLeft = [0, 0]
    let emptyBoard = Board.empty()
    dummyAdviser.coordsFor(emptyBoard).should.eql(topLeft)
  })
})
