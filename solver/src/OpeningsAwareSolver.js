'use strict'

module.exports = OpeningsAwareSolver

const _ = require('lodash')

const SmartSolver = require('./SmartSolver')

const boardCenter = [1, 1]

function OpeningsAwareSolver(board, sign) {
  switch (board.filledCells().length) {
    case 0:
      return chooseCoordsForEmptyBoard()
    case 1:
      return chooseCoordsForOneCellBoard(board)
    default:
      return SmartSolver(board, sign)
  }
}

function chooseCoordsForEmptyBoard() {
  return boardRandomCorner()
}

function chooseCoordsForOneCellBoard(board) {
  return board.isEmptyAt(boardCenter) ? boardCenter : boardRandomCorner()
}

function boardRandomCorner() {
  return randomItem([
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2]
  ])
}

function randomItem(array) {
  let randomIndex = _.random(array.length - 1)
  return array[randomIndex]
}
