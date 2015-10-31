'use strict'

require('chai').should()

const Board = require('../../core').Board
const ChoiceOptimizer = require('../src/ChoiceOptimizer')

const WIN = 1, TIE = 0, LOSS = -1
suite('advisers/smartSolver', () => {
  const X = 'X', O = 'O', _ = null

  suite('calculateBestOutcomeForMove', () => {
    let board

    suite('for only one empty cell', () => {
      const currentSign = 'O'
      test('it throws error when receiving winning board', () => {
        board = Board.prefilled.fromMatrix([
          [X, X, X],
          [O, O, X],
          [X, _, O]
        ])
        ChoiceOptimizer(board, currentSign).bestOutcomeWhenChoosing.bind(null, [2, 1])
          .should.throw(/finished/i)
      })

      test('it is win if, by filling the cell, the current sign wins', () => {
        board = Board.prefilled.fromMatrix([
          [X, O, X],
          [O, O, X],
          [X, _, O]
        ])
        ChoiceOptimizer(board, currentSign).bestOutcomeWhenChoosing([2, 1]).should.equal(WIN)
      })

      test('it is tie if, by filling the cell, the game ends with a tie', () => {
        board = Board.prefilled.fromMatrix([
          [X, O, O],
          [O, X, X],
          [X, _, O]
        ])
        ChoiceOptimizer(board, currentSign).bestOutcomeWhenChoosing([2, 1]).should.equal(TIE)
      })
    })

    suite('for two empty cells on board', () => {
      const currentSign = 'X'
      test('it is win if immediate winning move', () => {
        let chosenCoords = [2, 2]
        board = Board.prefilled.fromMatrix([
          [X, O, X],
          [O, O, X],
          [O, _, _]
        ])
        ChoiceOptimizer(board, currentSign).bestOutcomeWhenChoosing(chosenCoords).should.equal(WIN)
      })

      test('it is tie if opponent`s next move will end the game as such', () => {
        let chosenCoords = [2, 1]
        board = Board.prefilled.fromMatrix([
          [X, O, X],
          [O, O, X],
          [O, _, _]
        ])
        ChoiceOptimizer(board, currentSign).bestOutcomeWhenChoosing(chosenCoords).should.equal(TIE)
      })

      test('it is loss if opponent`s next move will win', () => {
        let chosenCoords = [2, 2]
        board = Board.prefilled.fromMatrix([
          [X, O, O],
          [O, O, X],
          [X, _, _]
        ])
        ChoiceOptimizer(board, currentSign).bestOutcomeWhenChoosing(chosenCoords).should.equal(LOSS)
      })
    })

    suite('for three empty cells on board', () => {
      test('it is loss if opponent has a winning next move', () => {
        let currentSign = 'O', chosenCoords = [2, 0]
        board = Board.prefilled.fromMatrix([
          [X, O, O],
          [O, X, X],
          [_, _, _]
        ])
        ChoiceOptimizer(board, currentSign).bestOutcomeWhenChoosing(chosenCoords).should.equal(LOSS)
      })
    })
  })
})
