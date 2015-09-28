'use strict'

const should = require('chai').should()

const Board = require('../src/Board')

suite('Board', () => {
  let emptyBoard
  setup(() => {
    emptyBoard = new Board()
  })

  suite('initially', () => {
    test('is empty at top left position', () => {
      const topLeftCoords = [0, 0]
      emptyBoard.isEmptyAt(topLeftCoords).should.equal(true)
    })

    test('is empty at bottom right position', () => {
      const bottomRightCoords = [2, 2]
      emptyBoard.isEmptyAt(bottomRightCoords).should.equal(true)
    })
  })
})
