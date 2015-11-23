'use strict'

const _ = require('lodash')

const CHOOSE_CELL_MESSAGE = 'Choose cell'

module.exports = class FakeUI {
  constructor() {
    this.output = []
    this.moveHandlers = {}
  }

  showMatrix(matrix) {
    let valuesTable = matrix.allRows()
      .map(row => row.join(' '))
      .join('\n')
    this.output.push(valuesTable)
  }

  readCoords(parser, validator) {
    this.output.push(CHOOSE_CELL_MESSAGE)
    this.moveHandlers = { parser, validator }
    return Promise.resolve()
  }

  wasAskedToMove() {
    return !_.isEmpty(this.moveHandlers)
  }

  returnedCoordsForInput(input) {
    return this.moveHandlers.parser(input)
  }

  returnedErrorForInput(input) {
    let validation = this.moveHandlers.validator(input)
    return validation === true ? null : validation
  }

  getOutput() {
    return this.output
  }

  static get chooseCellMessage() {
    return CHOOSE_CELL_MESSAGE
  }
}
