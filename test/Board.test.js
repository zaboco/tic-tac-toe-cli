'use strict'

require('chai').should()

const Board = require('../src/board/Board'),
  BoardError = require('../src/board/BoardError')

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
      const boardWithFirstRow = multiFill(rowCoords(0), X)
      boardWithFirstRow.hasWinner().should.equal(true)
    })

    test('not when the row is mixed', () => {
      const partialRow = rowCoords(0).slice(1),
        boardWithPartialRow = multiFill(partialRow, X),
        boardWithMixedRow = boardWithPartialRow.fillCell([0, 0], O)
      boardWithMixedRow.hasWinner().should.equal(false)
    })

    test('not when the board is empty', () => {
      emptyBoard.hasWinner().should.equal(false)
    })

    test('for second row, with same sign', () => {
      const boardWithSecondRow = multiFill(rowCoords(1), X)
      boardWithSecondRow.hasWinner().should.equal(true)
    })

    test('for first column, with same sign', () => {
      const boardWithFirstColumn = multiFill(columnCoords(0), X)
      boardWithFirstColumn.hasWinner().should.equal(true)
    })

    test('for third column, with same sign', () => {
      const boardWithThirdColumn = multiFill(columnCoords(2), X)
      boardWithThirdColumn.hasWinner().should.equal(true)
    })

    test('for left diagonal', () => {
      const boardWithLeftDiagonal = multiFill(leftDiagonalCoords(), X)
      boardWithLeftDiagonal.hasWinner().should.equal(true)
    })

    test('for right diagonal', () => {
      const boardWithRightDiagonal = multiFill(rightDiagonalCoords(), X)
      boardWithRightDiagonal.hasWinner().should.equal(true)
    })
  })
})

function multiFill(coordsList, sign) {
  const fillCell = (board, coords) => board.fillCell(coords, sign)
  return coordsList.reduce(fillCell, Board.empty())
}

function rowCoords(rowIndex) {
  return [0, 1, 2].map((columnIndex) => [rowIndex, columnIndex])
}

function columnCoords(columnIndex) {
  return [0, 1, 2].map((rowIndex) => [rowIndex, columnIndex])
}

function leftDiagonalCoords() {
  return [0, 1, 2].map((index) => [index, index])
}

function rightDiagonalCoords() {
  return [0, 1, 2].map((index) => [2 - index, index])
}
