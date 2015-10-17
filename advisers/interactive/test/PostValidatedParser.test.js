'use strict'

require('chai').should()

const sinon = require('sinon')

const PostValidatedParser = require('../src/PostValidatedParser')

suite('PostValidatedParser', () => {
  let postValidatedParser, originalParser, postValidator
  setup(() => {
    originalParser = {
      preValidate: sinon.stub(),
      parse: sinon.stub()
    }
    postValidator = sinon.stub()
    postValidatedParser = new PostValidatedParser(originalParser, postValidator)
  })

  suite('preValidate', () => {
    test('returns true if both pre and post validations pass', () => {
      originalParser.preValidate.returns(true)
      postValidator.returns(true)
      postValidatedParser.preValidate().should.be.true
    })

    test('forwards the error from the original parser pre-validation, if any', () => {
      const preValidationError = 'pre validation error'
      originalParser.preValidate.returns(preValidationError)
      postValidatedParser.preValidate().should.equal(preValidationError)
    })

    test('forwards the post validation error, if any, assuming the pre validation passes', () => {
      const postValidationError = 'post validation error'
      originalParser.preValidate.returns(true)
      postValidator.returns(postValidationError)
      postValidatedParser.preValidate().should.equal(postValidationError)
    })
  })

  test('parse forwards to the original parser', () => {
    const someInput = 'input:value', someParsedValue = { parsed: 'value' }
    originalParser.parse.withArgs(someInput).returns(someParsedValue)
    postValidatedParser.parse(someInput).should.equal(someParsedValue)
  })
})
