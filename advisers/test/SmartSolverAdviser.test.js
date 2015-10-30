'use strict'

require('chai').should()

const Board = require('../../core').Board

const WIN = 1, TIE = 0, LOSS = -1
suite('advisers/smartSolver', () => {
  const X = 'X', O = 'O', _ = null

  suite('calculateBestOutcome', () => {
    let board

    suite('for only one empty cell', () => {
      test('it throws error when receiving winning board', () => {
        let currentSign = 'O'
        board = Board.prefilled.fromMatrix([
          [X, X, X],
          [O, O, X],
          [X, _, O]
        ])
        calculateBestOutcome.bind(null, board, currentSign, [2, 1]).should.throw(/finished/i)
      })
      
      test('it is win if, by filling the cell, the current sign wins', () => {
        let currentSign = 'O'
        board = Board.prefilled.fromMatrix([
          [X, O, X],
          [O, O, X],
          [X, _, O]
        ])
        calculateBestOutcome(board, currentSign, [2, 1]).should.equal(WIN)
      })

      test('it is tie if, by filling the cell, the game ends with a tie', () => {
        let currentSign = 'O'
        board = Board.prefilled.fromMatrix([
          [X, O, O],
          [O, X, X],
          [X, _, O]
        ])
        calculateBestOutcome(board, currentSign, [2, 1]).should.equal(TIE)
      })
    })

    suite('for two empty cells on board', () => {
      test('it is win if immediate winning move', () => {
        let currentSign = 'X', chosenCoords = [2, 2]
        board = Board.prefilled.fromMatrix([
          [X, O, X],
          [O, O, X],
          [O, _, _]
        ])
        calculateBestOutcome(board, currentSign, chosenCoords).should.equal(WIN)
      })

      test('it is tie if opponent`s next move will end the game as such', () => {
        let currentSign = 'X', chosenCoords = [2, 1]
        board = Board.prefilled.fromMatrix([
          [X, O, X],
          [O, O, X],
          [O, _, _]
        ])
        calculateBestOutcome(board, currentSign, chosenCoords).should.equal(TIE)
      })

      test('it is loss if opponent`s next move will win', () => {
        let currentSign = 'X', chosenCoords = [2, 2]
        board = Board.prefilled.fromMatrix([
          [X, O, O],
          [O, O, X],
          [X, _, _]
        ])
        calculateBestOutcome(board, currentSign, chosenCoords).should.equal(LOSS)
      })
    })
  })
})

function calculateBestOutcome(board, currentSign, coords) {
  if (board.isFinished()) {
    throw Error('No move can be made, the game has already finished')
  }
  let newBoard = board.fillCell(coords, currentSign)
  return newBoard.performOnStatus({
    win(sign) {
      if (sign === currentSign) {
        return WIN
      }
    },
    tie() {
      return TIE
    },
    ongoing() {
      let emptyCoordsPairs = newBoard.findCells(it => it.isEmpty()).map(it => it.positionAsCoords())
      let bestOpponentOutcome = calculateBestOutcome(newBoard, otherSign(currentSign), emptyCoordsPairs[0])
      return negate(bestOpponentOutcome)
    }
  })
}

function negate(outcome) {
  return -outcome
}

function otherSign(sign) {
  return sign === 'X' ? 'O' : 'X'
}
