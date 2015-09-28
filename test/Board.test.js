'use strict'

const should = require('chai').should()

const Board = require('../src/Board'),
  BoardError = require('../src/BoardError')

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

    test('cannot access position outside board', () => {
      const outBoardCoords = [-1, 5]
      emptyBoard.isEmptyAt.bind(emptyBoard, outBoardCoords)
        .should.throw(BoardError, /must.*be.*within/i)
    })
  })
})
