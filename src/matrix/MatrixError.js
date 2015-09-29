'use strict'

const MatrixError = module.exports = class MatrixError extends Error {
  static invalidCoords(coords) {
    return new this.InvalidCoords(`${coords} are outside the matrix`)
  }
}

MatrixError.InvalidCoords = class InvalidCoords extends MatrixError {}
