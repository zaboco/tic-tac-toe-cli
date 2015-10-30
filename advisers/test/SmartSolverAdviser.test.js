'use strict'

require('chai').should()

const Board = require('../../core').Board

const WIN = 1, TIE = 0
suite('advisers/smartSolver', () => {
  const X = 'X', O = 'O', _ = null

  suite('calculateOutcome', () => {
    let board

    suite('for only one empty cell', () => {
      test('it is win if, by filling the cell, the current sign wins', () => {
        let currentSign = 'O'
        board = Board.prefilled.fromMatrix([
          [X, O, X],
          [O, O, X],
          [X, _, O]
        ])
        calculateOutcome(board, currentSign, [2, 1]).should.equal(WIN)
      })

      test('it is tie if, by filling the cell, the game ends with a tie', () => {
        let currentSign = 'O'
        board = Board.prefilled.fromMatrix([
          [X, O, O],
          [O, X, X],
          [X, _, O]
        ])
        calculateOutcome(board, currentSign, [2, 1]).should.equal(TIE)
      })
    })
  })
})

function calculateOutcome(board, currentSign, coords) {
  let newBoard = board.fillCell(coords, currentSign)
  return newBoard.performOnStatus({
    win(sign) {
      if (sign === currentSign) {
        return WIN
      }
    },
    tie() {
      return TIE
    }
  })
}
