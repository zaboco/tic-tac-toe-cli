'use strict'

const should = require('chai').should()

const Board = require('../src/Board'),
  BoardError = require('../src/BoardError')

const X = 'X', O = 'O'

suite('Board', () => {
  const emptyCellSign = ' '
  let emptyBoard
  setup(() => {
    emptyBoard = Board.empty()
  })

  suite('initially', () => {
    const topLeftCoords = [0, 0]
    test('is empty at top left position', () => {
      emptyBoard.isEmptyAt(topLeftCoords).should.equal(true)
    })

    test('is empty at bottom right position', () => {
      const bottomRightCoords = [2, 2]
      emptyBoard.isEmptyAt(bottomRightCoords).should.equal(true)
    })

    test('there is no sign at top left position', () => {
      emptyBoard.getSignAt(topLeftCoords).should.equal(emptyCellSign)
    })


    suite('for a position outside the board', () => {
      const outBoardCoords = [-1, 5]
      test('cannot check if it`s empty', () => {
        emptyBoard.isEmptyAt.bind(emptyBoard, outBoardCoords)
          .should.throw(BoardError, /must.*be.*within/i)
      })

      test('cannot get sign ', () => {
        emptyBoard.getSignAt.bind(emptyBoard, outBoardCoords)
          .should.throw(BoardError, /must.*be.*within/i)
      })
    })

  })

  suite('after filling a cell with a sign', () => {
    let newBoard
    const someCellCoords = [1, 2],
      otherCellCoords = [0, 1],
      someSign = X
    setup(() => {
      newBoard = emptyBoard.fillCell(someCellCoords, someSign)
    })

    test('a board is returned', () => {
      newBoard.should.be.instanceOf(Board)
    })

    test('the board is different', () => {
      newBoard.should.not.equal(emptyBoard)
    })

    test('the filled cell is no longer empty', () => {
      newBoard.isEmptyAt(someCellCoords).should.equal(false)
    })

    test('other cell is still empty', () => {
      newBoard.isEmptyAt(otherCellCoords).should.equal(true)
    })

    test('the sign at the given position is the right one', () => {
      newBoard.getSignAt(someCellCoords).should.equal(someSign)
    })

    test('the sign at another location is still the empty sign', () => {
      newBoard.getSignAt(otherCellCoords).should.equal(emptyCellSign)
    })
  })

  suite('trying to fill the second cell', () => {
    let boardAfterFirstFill
    const firstCellCoords = [1, 2], firstSign = X, anySign = '*'
    setup(() => {
      boardAfterFirstFill = emptyBoard.fillCell(firstCellCoords, firstSign)
    })

    test('fails for the same cell', () => {
      boardAfterFirstFill.fillCell.bind(boardAfterFirstFill, firstCellCoords, anySign)
        .should.throw(BoardError, /not.*empty/i)
    })

    test('marks a free cell with the right sign', () => {
      const secondCellCoords = [0, 1], secondSign = O
      let boardAfterSecondFill = boardAfterFirstFill.fillCell(secondCellCoords, secondSign)
      boardAfterSecondFill.getSignAt(secondCellCoords).should.equal(secondSign)
    })
  })
})
