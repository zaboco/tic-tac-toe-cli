'use strict'

const CoordsValidator = require('./CoordsValidator')

module.exports = class InteractiveMoveAdviser {
  constructor(inputProcessor) {
    this.inputProcessor = inputProcessor
  }

  coordsFor(board) {
    return this.inputProcessor.processWithValidator(CoordsValidator(board))
  }
}
