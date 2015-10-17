'use strict'

module.exports = class PostValidatedTransformer {
  constructor(inputTransformer, postValidator) {
    this.inputTransformer = inputTransformer
    this.postValidator = postValidator
  }

  preValidate(inputString) {
    let isInputValid = this.inputTransformer.preValidate(inputString)
    if (isInputValid !== true) {
      return isInputValid
    }
    let parsedValue = this.inputTransformer.parse(inputString)
    return this.postValidator(parsedValue)
  }

  parse(inputString) {
    return this.inputTransformer.parse(inputString)
  }
}
