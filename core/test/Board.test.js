'use strict'

require('chai').should()

const Board = require('../src/board'),
  BoardError = require('../src/board/BoardError'),
  prefilledBoard = require('../src/board/prefilled'),
  GridFormatter = require('../src/GridFormatter')

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

    test('has no filled cells', () => {
      emptyBoard.filledCells().should.be.empty
    })

    test('there is no sign at top left position', () => {
      emptyBoard.getSignAt(topLeftCoords).should.equal(emptyCellSign)
    })

    test('it is open', () => {
      assertBoardIsOpen(emptyBoard)
    })
  })

  suite('for a position outside the board', () => {
    const outBoardCoords = [-1, 5]

    test('areCoordsOutside returns true', () => {
      emptyBoard.areCoordsOutside(outBoardCoords).should.be.true
    })

    test('cannot check if it`s empty', () => {
      emptyBoard.isEmptyAt.bind(emptyBoard, outBoardCoords)
        .should.throw(BoardError.CellOutsideBoard)
    })

    test('cannot get sign ', () => {
      emptyBoard.getSignAt.bind(emptyBoard, outBoardCoords)
        .should.throw(BoardError.CellOutsideBoard)
    })

    test('cannot fill cell', () => {
      emptyBoard.fillCellAt.bind(emptyBoard, outBoardCoords)
        .should.throw(BoardError.CellOutsideBoard)
    })
  })

  suite('after filling a cell with a sign', () => {
    let newBoard
    const someCellCoords = [1, 2],
      otherCellCoords = [0, 1],
      someSign = X
    setup(() => {
      newBoard = emptyBoard.fillCellAt(someCellCoords, someSign)
    })

    test('a board is returned', () => {
      newBoard.should.be.instanceOf(Board)
    })

    test('the board is different', () => {
      newBoard.should.not.equal(emptyBoard)
    })

    test('the board has filled cells', () => {
      newBoard.filledCells().should.not.be.empty
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

    test('the board is still open', function() {
      assertBoardIsOpen(newBoard)
    })

    test('inspect string contains the added sign', () => {
      newBoard.inspect().should.contain(someSign)
    })
  })

  test('filling a board with a `null` leaves the cell empty', () => {
    const someCoords = [1, 2]
    const boardAfterSettingNullSign = emptyBoard.fillCellAt(someCoords, null)
    boardAfterSettingNullSign.isEmptyAt(someCoords)
  })

  suite('trying to fill the second cell', () => {
    let boardAfterFirstFill
    const firstCellCoords = [1, 2], firstSign = X,
      secondCellCoords = [0, 1], secondSign = O
    setup(() => {
      boardAfterFirstFill = emptyBoard.fillCellAt(firstCellCoords, firstSign)
    })

    test('fails for the same cell', () => {
      const anySign = '*'
      boardAfterFirstFill.fillCellAt.bind(boardAfterFirstFill, firstCellCoords, anySign)
        .should.throw(BoardError.CellNotEmpty)
    })

    test('marks a free cell with the right sign', () => {
      let boardAfterSecondFill = boardAfterFirstFill.fillCellAt(secondCellCoords, secondSign)
      boardAfterSecondFill.getSignAt(secondCellCoords).should.equal(secondSign)
    })

    test('the previous board is not changed', () => {
      boardAfterFirstFill.fillCellAt(secondCellCoords, secondSign)
      boardAfterFirstFill.isEmptyAt(secondCellCoords).should.equal(true)
    })
  })

  suite('winning', function() {
    const fullGroupOfX = [X, X, X]
    const testCases = [
      [prefilledBoard.fromRow(fullGroupOfX), 'first row'],
      [prefilledBoard.fromRow(fullGroupOfX, 1), 'second row'],
      [prefilledBoard.fromRow(fullGroupOfX, 2), 'third row'],
      [prefilledBoard.fromColumn(fullGroupOfX), 'first column'],
      [prefilledBoard.fromColumn(fullGroupOfX, 1), 'second column'],
      [prefilledBoard.fromColumn(fullGroupOfX, 2), 'third column'],
      [prefilledBoard.fromMatrix([[X, _, _], [_, X, _], [_, _, X]]), 'left diagonal'],
      [prefilledBoard.fromMatrix([[_, _, X], [_, X, _], [X, _, _]]), 'right diagonal']
    ]
    testCases.forEach(testCase => {
      let expectedWinnerBoard = testCase[0]
      let testMessage = testCase[1]
      test(`for ${testMessage}`, function() {
        assertBoardHasWinner(expectedWinnerBoard, X)
      })
    })

    test('not when the row is mixed', () => {
      assertBoardIsOpen(prefilledBoard.fromRow([X, X, O]))
    })
  })

  test('a non-winning full board has tie', () => {
    let fullMixedBoard = prefilledBoard.fromMatrix([
      [X, X, O],
      [O, X, X],
      [X, O, O]
    ])
    assertBoardHasTie(fullMixedBoard)
  })

  test('formatting as grid', () => {
    let fullBoard = prefilledBoard.fromMatrix([
      [X, X, O],
      [O, X, X],
      [X, O, O]
    ])
    let formatter = GridFormatter.standard
    fullBoard.formatWith(formatter).should.equal([
      ' X │ X │ O ',
      '───────────',
      ' O │ X │ X ',
      '───────────',
      ' X │ O │ O '
    ].join('\n'))
  })

  function assertBoardHasWinner(board, sign) {
    board.getWinningSign().should.equal(sign)
    board.hasWinner().should.be.true
    board.hasTie().should.be.false
    board.isFinished().should.be.true
  }

  function assertBoardHasTie(board) {
    board.hasWinner().should.be.false
    board.hasTie().should.be.true
    board.isFinished().should.be.true
  }

  function assertBoardIsOpen(board) {
    board.hasWinner().should.be.false
    board.hasTie().should.be.false
    board.isFinished().should.be.false
  }
})
