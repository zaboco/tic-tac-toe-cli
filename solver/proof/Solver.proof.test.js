'use strict'

require('chai').should()

const Board = require('../../core').Board
const ChoiceOptimizer = require('../src/ChoiceOptimizer')
const SmartSolver = require('../src/SmartSolver')
const registry = require('../../registry')

const computerSign = 'X', opponentSign = 'O'
let computerMover = ComputerMover(computerSign)
let fixedMover = FixedMover(opponentSign)

let startTimestamp = Date.now()
suite('solver', () => {
  suiteTeardown(() => {
    let duration = Date.now() - startTimestamp
    console.log(`\nThe full check took ${(duration / 1000)}s`)
  })
  suite('when first to move', () => {
    testComputerMove(Board.empty(), [])
  })

  suite('when second to move', () => {
    testAllOpponentMoves(Board.empty(), [])
  })

  test('against itself results in a tie', () => {
    let firstMover = ComputerMover(computerSign)
    let secondMover = ComputerMover(opponentSign)
    firstMover.next = secondMover
    secondMover.next = firstMover
    let finalBoard = moveUntilFinished(firstMover, Board.empty())
    let isTieGame = finalBoard.performOnStatus({ tie: () => true })
    isTieGame.should.be.true
  })
})

function moveUntilFinished(mover, board) {
  if (board.isFinished()) {
    return board
  }
  let newBoard = mover(board).board
  return moveUntilFinished(mover.next, newBoard)
}

function testComputerMove(board, moves) {
  let computerMove = computerMover(board)
  let move = coordsToHeaders(computerMove.coords)
  let allMoves = moves.concat(move)
  suite(`[computer] #${moves.length + 1}: ${move}`, () => {
    let boardAfterComputerMove = computerMove.board
    if (boardAfterComputerMove.isFinished()) {
      assertComputerHasNotLoose(boardAfterComputerMove, allMoves, board)
    } else {
      testAllOpponentMoves(boardAfterComputerMove, allMoves)
    }
  })
}

function testAllOpponentMoves(board, moves) {
  let opponentMoves = fixedMover(board)
  let optionsCount = opponentMoves.length
  opponentMoves.forEach((opponentMove, optionIndex) => {
    let move = coordsToHeaders(opponentMove.coords)
    let allMoves = moves.concat(move)
    suite(formatOpponentSuiteDescription(moves.length, optionIndex, optionsCount, move), () => {
      let boardAfterOpponentMove = opponentMove.board
      if (boardAfterOpponentMove.isFinished()) {
        assertComputerHasNotLoose(boardAfterOpponentMove, allMoves, board)
      } else {
        testComputerMove(boardAfterOpponentMove, allMoves)
      }
    })
  })
}

function formatOpponentSuiteDescription(round, optionIndex, totalOptions, move) {
  return `[opponent] #${round + 1}: ${move} (${optionIndex}/${totalOptions})`
}

function assertComputerHasNotLoose(board, moves) {
  test(`computer didn't loose for ${moves}`, () => {
    board.hasWinner(opponentSign).should.be.false
  })
}

function FixedMover(sign) {
  return function moveOn(initialBoard) {
    return initialBoard.emptyCells().map(cell => {
      let coords = cell.positionAsCoords()
      let board = initialBoard.fillCellAt(coords, sign)
      return { coords, board }
    })
  }
}

function ComputerMover(sign) {
  let solver = SmartSolver()
  return function moveOn(initialBoard) {
    let coords = solver(initialBoard, sign)
    let board = initialBoard.fillCellAt(coords, sign)
    return { coords, board }
  }
}

function coordsToHeaders(coords) {
  let headerMappers = registry.headerMappers
  let rowHeader = headerMappers.row.fromIndex(coords[0])
  let columnHeader = headerMappers.column.fromIndex(coords[1])
  return `${columnHeader}${rowHeader}`
}
