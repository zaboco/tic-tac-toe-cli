'use strict'

require('chai').should()

const HeadersPairParser = require('../src/HeadersPairParser'),
  headers = require('../../../headers')

suite('HeadersPairParser', () => {
  let parser
  setup(() => {
    parser = new HeadersPairParser({
      column: headers.Alphabetic(),
      row: headers.Numeric()
    })
  })

  suite('first char is for column', () => {
    test('a -> 0', () => {
      parser.parse('a1').should.have.property('column', 0)
    })

    test('b -> 1', () => {
      parser.parse('b1').should.have.property('column', 1)
    })

    test('c -> 2', () => {
      parser.parse('c1').should.have.property('column', 2)
    })

    test('it is case insensitive', () => {
      parser.parse('A1').should.have.property('column', 0)
    })
  })

  suite('second char is for row', () => {
    test('1 -> 0', () => {
      parser.parse('a1').should.have.property('row', 0)
    })

    test('2 -> 1', () => {
      parser.parse('a2').should.have.property('row', 1)
    })

    test('3 -> 2', () => {
      parser.parse('a3').should.have.property('row', 2)
    })
  })

  suite('validate', () => {
    test('returns true if the input has the right format', () => {
      parser.preValidate('a3').should.be.true
    })

    test('returns error string if the input is empty', () => {
      parser.preValidate().should.match(/input.*empty/i)
      parser.preValidate('').should.match(/input.*empty/i)
    })

    test('returns other error string if the input`s length is different from 2', () => {
      parser.preValidate('a').should.match(/input.*length.*2/i)
      parser.preValidate('ab12').should.match(/input.*length.*2/i)
    })
  })
})
