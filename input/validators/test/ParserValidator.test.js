'use strict'

require('chai').should()

const sinon = require('sinon')

const ParserValidator = require('../src/ParserValidator')

suite('ParserValidator', () => {
  let originalParser, postValidator, parserValidator
  setup(() => {
    originalParser = {
      preValidate: sinon.stub(),
      parse: sinon.stub()
    }
    postValidator = sinon.stub()
    parserValidator = ParserValidator(originalParser, postValidator)
  })

  test('returns true if both pre and post validations pass', () => {
    originalParser.preValidate.returns(true)
    postValidator.returns(true)
    parserValidator().should.be.true
  })

  test('forwards the error from the original parser pre-validation, if any', () => {
    const preValidationError = 'pre validation error'
    originalParser.preValidate.returns(preValidationError)
    parserValidator().should.equal(preValidationError)
  })

  test('forwards the post validation error, if any, assuming the pre validation passes', () => {
    const postValidationError = 'post validation error'
    originalParser.preValidate.returns(true)
    postValidator.returns(postValidationError)
    parserValidator().should.equal(postValidationError)
  })
})
