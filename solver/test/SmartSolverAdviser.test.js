'use strict'

require('chai').should()

const Board = require('../../core').Board
const ChoiceOptimizer = require('../src/ChoiceOptimizer')
const outcomes = require('../src/outcomes')

const WIN = outcomes.WIN, TIE = outcomes.TIE, LOSS = outcomes.LOSS
suite('ChoiceOptimizer', () => {
  const X = 'X', O = 'O', _ = null

  const bottomLeft = [2, 0], bottomCenter = [2, 1], bottomRight = [2, 2]
  suite('bestOutcomeWhenChoosing', () => {
    let board

    test('it throws error when receiving winning board', () => {
      board = Board.prefilled.fromRow([X, X, X])
      ChoiceOptimizer(board).bestOutcomeWhenChoosing.bind(null, [2, 1])
        .should.throw(/finished/i)
    })

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

  suite('bestChoice', () => {
    const currentSign = 'O'
    test('it is WIN with the move for which the opponent has a no chance to avoid losing', () => {
      let board = Board.prefilled.fromMatrix([
        [O, O, X],
        [_, X, O],
        [_, _, O]
      ])
      choiceShouldBe(ChoiceOptimizer(board, currentSign).bestChoice(), WIN, bottomLeft)
    })

    test('it is TIE with the move that prevents the opponent from winning', () => {
      let board = Board.prefilled.fromMatrix([
        [X, O, O],
        [O, X, X],
        [_, _, _]
      ])
      choiceShouldBe(ChoiceOptimizer(board, currentSign).bestChoice(), TIE, bottomRight)
    })

    test('it is LOSS when the no move can prevent losing', () => {
      let board = Board.prefilled.fromMatrix([
        [X, X, O],
        [_, O, X],
        [X, _, X]
      ])
      choiceShouldBe(ChoiceOptimizer(board, currentSign).bestChoice(), LOSS, bottomCenter)
    })
  })
})

function choiceShouldBe(choice, outcome, coords) {
  choice.getOutcome().should.equal(outcome)
  choice.getCoords().should.eql(coords)
}
