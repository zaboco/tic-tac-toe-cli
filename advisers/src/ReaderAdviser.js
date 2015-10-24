'use strict'

module.exports = ReaderAdviser

const validators = require('../../input/validators/index')

function ReaderAdviser(reader, coordsParser) {
  return function chooseCoords(board) {
    let coordsValidator = validators.Coords(board)
    let parserValidator = validators.Parser(coordsParser, coordsValidator)
    return reader(coordsParser.parse, parserValidator)
  }
}
