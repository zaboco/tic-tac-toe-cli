'use strict'

require('chai').should()

const HeadersPairTransformer = require('../src/HeadersPairTransformer'),
  headers = require('../../../headers')

suite('HeadersPairTransformer', () => {
  let transformer
  setup(() => {
    transformer = new HeadersPairTransformer({
      column: headers.Alphabetic(),
      row: headers.Numeric()
    })
  })

  suite('first char is for column', () => {
    test('a -> 0', () => {
      transformer.parse('a1').should.have.property('column', 0)
    })

    test('b -> 1', () => {
      transformer.parse('b1').should.have.property('column', 1)
    })

    test('c -> 2', () => {
      transformer.parse('c1').should.have.property('column', 2)
    })

    test('it is case insensitive', () => {
      transformer.parse('A1').should.have.property('column', 0)
    })
  })

  suite('second char is for row', () => {
    test('1 -> 0', () => {
      transformer.parse('a1').should.have.property('row', 0)
    })

    test('2 -> 1', () => {
      transformer.parse('a2').should.have.property('row', 1)
    })

    test('3 -> 2', () => {
      transformer.parse('a3').should.have.property('row', 2)
    })
  })
})
