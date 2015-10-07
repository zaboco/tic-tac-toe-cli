'use strict'

require('chai').should()

const Board = require('../src/board'),
  BoardError = require('../src/board/BoardError'),
  prefillBoard = require('./util/prefillBoard')

const X = 'X', O = 'O', _ = null

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

    test('is all empty', () => {
      emptyBoard.isEmpty().should.equal(true)
    })

    test('there is no sign at top left position', () => {
      emptyBoard.getSignAt(topLeftCoords).should.equal(emptyCellSign)
    })

    test('it has no winner', () => {
      emptyBoard.hasWinner().should.equal(false)
    })

    test('it is not tie', () => {
      emptyBoard.hasTie().should.equal(false)
    })

    suite('for a position outside the board', () => {
      const outBoardCoords = [-1, 5]
      test('cannot check if it`s empty', () => {
        emptyBoard.isEmptyAt.bind(emptyBoard, outBoardCoords)
          .should.throw(BoardError.CellOutsideBoard)
      })

      test('cannot get sign ', () => {
        emptyBoard.getSignAt.bind(emptyBoard, outBoardCoords)
          .should.throw(BoardError.CellOutsideBoard)
      })

      test('cannot fill cell', () => {
        emptyBoard.fillCell.bind(emptyBoard, outBoardCoords)
          .should.throw(BoardError.CellOutsideBoard)
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

    test('the board is no longer empty', () => {
      newBoard.isEmpty().should.equal(false)
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

    test('the board does not have winner', () => {
      newBoard.hasWinner().should.equal(false)
    })

    test('the board does not have tie', () => {
      newBoard.hasTie().should.equal(false)
    })

    test('toString contains the added sign', () => {
      newBoard.toString().should.contain(someSign)
    })
  })

  test('filling a board with a `null` leaves the cell empty', () => {
    const someCoords = [1, 2]
    const boardAfterSettingNullSign = emptyBoard.fillCell(someCoords, null)
    boardAfterSettingNullSign.isEmptyAt(someCoords)
  })

  suite('trying to fill the second cell', () => {
    let boardAfterFirstFill
    const firstCellCoords = [1, 2], firstSign = X,
      secondCellCoords = [0, 1], secondSign = O
    setup(() => {
      boardAfterFirstFill = emptyBoard.fillCell(firstCellCoords, firstSign)
    })

    test('fails for the same cell', () => {
      const anySign = '*'
      boardAfterFirstFill.fillCell.bind(boardAfterFirstFill, firstCellCoords, anySign)
        .should.throw(BoardError.CellNotEmpty)
    })

    test('marks a free cell with the right sign', () => {
      let boardAfterSecondFill = boardAfterFirstFill.fillCell(secondCellCoords, secondSign)
      boardAfterSecondFill.getSignAt(secondCellCoords).should.equal(secondSign)
    })

    test('the previous board is not changed', () => {
      boardAfterFirstFill.fillCell(secondCellCoords, secondSign)
      boardAfterFirstFill.isEmptyAt(secondCellCoords).should.equal(true)
    })
  })

  suite('winning', () => {
    test('for first row, with same sign', () => {
      const boardWithFirstRow = prefillBoard.fromRow([X, X, X])
      boardWithFirstRow.hasWinner().should.equal(true)
    })

    test('not when the row is mixed', () => {
      const boardWithMixedRow = prefillBoard.fromRow([X, X, O])
      boardWithMixedRow.hasWinner().should.equal(false)
    })

    test('for second row, with same sign', () => {
      const boardWithSecondRow = prefillBoard.fromRow([X, X, X], 1)
      boardWithSecondRow.hasWinner().should.equal(true)
    })

    test('for first column, with same sign', () => {
      const boardWithFirstColumn = prefillBoard.fromColumn([X, X, X])
      boardWithFirstColumn.hasWinner().should.equal(true)
    })

    test('for third column, with same sign', () => {
      const boardWithThirdColumn = prefillBoard.fromColumn([X, X, X], 1)
      boardWithThirdColumn.hasWinner().should.equal(true)
    })

    test('for left diagonal', () => {
      const boardWithLeftDiagonal = prefillBoard.fromMatrix([
        [X, _, _],
        [_, X, _],
        [_, _, X]
      ])
      boardWithLeftDiagonal.hasWinner().should.equal(true)
    })

    test('for right diagonal', () => {
      const boardWithRightDiagonal = prefillBoard.fromMatrix([
        [_, _, X],
        [_, X, _],
        [X, _, _]
      ])
      boardWithRightDiagonal.hasWinner().should.equal(true)
    })

    test('when it is a win it is not a tie', () => {
      const winnerBoard = prefillBoard.fromRow([X, X, X])
      winnerBoard.hasTie().should.equal(false)
    })
  })

  suite('for non-winning full board', () => {
    const fullMixedBoard = prefillBoard.fromMatrix([
      [X, X, O],
      [O, X, X],
      [X, O, O]
    ])

    test('it is a tie', () => {
      fullMixedBoard.hasTie().should.equal(true)
    })

    test('it is not winner', () => {
      fullMixedBoard.hasWinner().should.equal(false)
    })
  })
})
