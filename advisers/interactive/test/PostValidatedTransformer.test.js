'use strict'

require('chai').should()

const sinon = require('sinon')

const PostValidatedTransformer = require('../src/PostValidatedTransformer')

suite('PostValidatedTransformer', () => {
  let postValidatedTransformer, originalTransformer, postValidator
  setup(() => {
    originalTransformer = {
      preValidate: sinon.stub(),
      parse: sinon.stub()
    }
    postValidator = sinon.stub()
    postValidatedTransformer = new PostValidatedTransformer(originalTransformer, postValidator)
  })

  suite('preValidate', () => {
    test('returns true if both pre and post validations pass', () => {
      originalTransformer.preValidate.returns(true)
      postValidator.returns(true)
      postValidatedTransformer.preValidate().should.be.true
    })

    test('forwards the error from the original transformer pre-validation, if any', () => {
      const preValidationError = 'pre validation error'
      originalTransformer.preValidate.returns(preValidationError)
      postValidatedTransformer.preValidate().should.equal(preValidationError)
    })

    test('forwards the post validation error, if any, assuming the pre validation passes', () => {
      const postValidationError = 'post validation error'
      originalTransformer.preValidate.returns(true)
      postValidator.returns(postValidationError)
      postValidatedTransformer.preValidate().should.equal(postValidationError)
    })
  })

  test('parse forwards to the original transformer', () => {
    const someInput = 'input:value', someParsedValue = { parsed: 'value' }
    originalTransformer.parse.withArgs(someInput).returns(someParsedValue)
    postValidatedTransformer.parse(someInput).should.equal(someParsedValue)
  })
})
