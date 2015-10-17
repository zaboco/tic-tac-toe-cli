'use strict'

module.exports = class PostValidatedParser {
  constructor(inputParser, postValidator) {
    this.inputParser = inputParser
    this.postValidator = postValidator
  }

  preValidate(inputString) {
    let isInputValid = this.inputParser.preValidate(inputString)
    if (isInputValid !== true) {
      return isInputValid
    }
    let parsedValue = this.inputParser.parse(inputString)
    return this.postValidator(parsedValue)
  }

  parse(inputString) {
    return this.inputParser.parse(inputString)
  }
}
