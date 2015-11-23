'use strict'

const _ = require('lodash')

module.exports = class HumanPlayer {
  constructor(sign) {
    this.sign = sign
  }

  findMoveFor(board, gameUI) {
    let matrixOfFlatCellIndexes = board.mapMatrix((cell, i, j) => {
      return cell.isEmpty() ? coordsToFlatIndex(i, j) : cell
    })
    gameUI.showMatrix(matrixOfFlatCellIndexes)
    return gameUI.readCoords(flatIndexParser, input => validateMoveInput(input, board))
  }

  getSign() {
    return this.sign
  }
}

function coordsToFlatIndex(row, column) {
  return row * 3 + column + 1
}

function validateMoveInput(input, board) {
  if (input === '') {
    return 'Input cannot be empty'
  }
  if (!_.inRange(parseInt(input), 1, 10)) {
    return 'Input must be a number between 1 and 9'
  }
  if (!board.isEmptyAt(flatIndexParser(input))) {
    return 'Cell must be empty'
  }
  return true
}

function flatIndexParser(indexAsText) {
  let zeroBasedIndex = parseInt(indexAsText) - 1
  let row = Math.trunc(zeroBasedIndex / 3)
  let column = zeroBasedIndex % 3
  return [row, column]
}
