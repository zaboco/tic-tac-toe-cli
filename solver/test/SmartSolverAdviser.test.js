'use strict'

require('chai').should()

const Board = require('../../core').Board
const ChoiceOptimizer = require('../src/ChoiceOptimizer')

const WIN = 1, TIE = 0, LOSS = -1
suite('advisers/smartSolver', () => {
  const X = 'X', O = 'O', _ = null

  suite('calculateBestOutcomeForMove', () => {
    let board

    test('it throws error when receiving winning board', () => {
      board = Board.prefilled.fromRow([X, X, X])
      ChoiceOptimizer(board).bestOutcomeWhenChoosing.bind(null, [2, 1])
        .should.throw(/finished/i)
    })

    const bottomLeft = [2, 0], bottomCenter = [2, 1], bottomRight = [2, 2]
    suite('for only one empty cell', () => {
      const currentSign = 'O'

      test('it is win if, by filling the cell, the current sign wins', () => {
        board = Board.prefilled.fromMatrix([
          [X, O, X],
          [O, O, X],
          [X, _, O]
        ])
        ChoiceOptimizer(board, currentSign).bestOutcomeWhenChoosing(bottomCenter).should.equal(WIN)
      })

      test('it is tie if, by filling the cell, the game ends with a tie', () => {
        board = Board.prefilled.fromMatrix([
          [X, O, O],
          [O, X, X],
          [X, _, O]
        ])
        ChoiceOptimizer(board, currentSign).bestOutcomeWhenChoosing(bottomCenter).should.equal(TIE)
      })
    })

    suite('for two empty cells on board', () => {
      const currentSign = 'X'
      test('it is win if immediate winning move', () => {
        board = Board.prefilled.fromMatrix([
          [X, O, X],
          [O, O, X],
          [O, _, _]
        ])
        ChoiceOptimizer(board, currentSign).bestOutcomeWhenChoosing(bottomRight).should.equal(WIN)
      })

      test('it is tie if opponent`s next move will end the game as such', () => {
        board = Board.prefilled.fromMatrix([
          [X, O, X],
          [O, O, X],
          [O, _, _]
        ])
        ChoiceOptimizer(board, currentSign).bestOutcomeWhenChoosing(bottomCenter).should.equal(TIE)
      })

      test('it is loss if opponent`s next move will win', () => {
        board = Board.prefilled.fromMatrix([
          [X, O, O],
          [O, O, X],
          [X, _, _]
        ])
        ChoiceOptimizer(board, currentSign).bestOutcomeWhenChoosing(bottomRight).should.equal(LOSS)
      })
    })

    suite('for three empty cells on board', () => {
      const currentSign = 'O'
      test('it is loss if opponent has a winning next move', () => {
        board = Board.prefilled.fromMatrix([
          [X, O, O],
          [O, X, X],
          [_, _, _]
        ])
        ChoiceOptimizer(board, currentSign).bestOutcomeWhenChoosing(bottomLeft).should.equal(LOSS)
      })

      test('it is tie if opponent has a no winning move', () => {
        board = Board.prefilled.fromMatrix([
          [X, O, O],
          [O, X, X],
          [_, _, _]
        ])
        ChoiceOptimizer(board, currentSign).bestOutcomeWhenChoosing(bottomRight).should.equal(TIE)
      })

      test('it is win if opponent has a no chance of avoiding it', () => {
        board = Board.prefilled.fromMatrix([
          [O, O, X],
          [_, X, O],
          [_, _, O]
        ])
        ChoiceOptimizer(board, currentSign).bestOutcomeWhenChoosing(bottomLeft).should.equal(WIN)
      })
    })
  })
})
