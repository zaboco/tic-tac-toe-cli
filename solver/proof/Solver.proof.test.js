'use strict'

require('chai').should()

const Board = require('../../core').Board
const ChoiceOptimizer = require('../src/ChoiceOptimizer')

suite('solver', function() {
  this.timeout(1000000)
  test('for empty board', function() {
    const firstSign = 'X', secondSign = 'O'
    let emptyBoard = Board.empty()
    emptyBoard.emptyCells().map(it => it.positionAsCoords()).forEach(coords => {
      console.log(`\n--- Analyzing ${coords.join(':')}`)
      let board = emptyBoard.fillCellAt(coords, firstSign)
      let choice = ChoiceOptimizer(board, secondSign).bestChoice()
      console.log(`BEST: ---> ${choice}`)
    })
  })
})
