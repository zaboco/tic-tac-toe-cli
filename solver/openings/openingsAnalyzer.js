'use strict'

const Board = require('../../core').Board
const registry = require('../../registry')
const ChoiceOptimizer = require('../src/ChoiceOptimizer')
const outcomes = require('../src/outcomes')

const firstSign = 'X', secondSign = 'O'
let emptyBoard = Board.empty()

emptyBoard.emptyCells().map(it => it.positionAsCoords()).forEach(coords => {
  let oneCellBoard = emptyBoard.fillCellAt(coords, firstSign)
  console.log(plotMovesForTie(oneCellBoard, secondSign, coords))
})

function plotMovesForTie(board, sign, firstMove) {
  let plottedBoard = getMovesForTie(board, sign).reduce((board, coords) => {
    return board.fillCellAt(coords, '2')
  }, emptyBoard.fillCellAt(firstMove, '1'))
  return plottedBoard.formatWith(registry.boardFormatter)
}

function getMovesForTie(board, sign) {
  return board.emptyCells().map(it => it.positionAsCoords()).filter(coords => {
    return ChoiceOptimizer(board, sign).bestOutcomeWhenChoosing(coords) === outcomes.TIE
  })
}
