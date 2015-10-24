'use strict'

module.exports = ParserValidator

function ParserValidator(parser, postValidator) {
  let parse = parser.parse, preValidate = parser.preValidate
  return function parserValidator(input) {
    let isInputValid = preValidate(input)
    if (isInputValid !== true) {
      return isInputValid
    }
    let parsedValue = parse(input)
    return postValidator(parsedValue)
  }
}
