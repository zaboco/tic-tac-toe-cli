'use strict'

const CellError = module.exports = class CellError extends Error {
  static alreadyFilled(sign) {
    return new this.AlreadyFilledError(`This cell has already been filled with ${sign}`)
  }
}

CellError.AlreadyFilledError = class AlreadyFilledError extends CellError {}
