'use strict'

require('chai').should()

const ImmutableMatrix = require('../src/matrix/ImmutableMatrix')

const matrixSource = [
  [0, 1, 2],
  [10, 11, 12],
  [20, 21, 22]
]

suite('ImmutableMatrix', () => {
  const matrix = new ImmutableMatrix(matrixSource)

  suite('getRow', () => {
    test('0', () => {
      matrix.getRow(0).should.eql([0, 1, 2])
    })

    test('1', () => {
      matrix.getRow(1).should.eql([10, 11, 12])
    })

    test('2', () => {
      matrix.getRow(2).should.eql([20, 21, 22])
    })
  })

  suite('getColumn', () => {
    test('0', () => {
      matrix.getColumn(0).should.eql([0, 10, 20])
    })

    test('1', () => {
      matrix.getColumn(1).should.eql([1, 11, 21])
    })

    test('2', () => {
      matrix.getColumn(2).should.eql([2, 12, 22])
    })
  })

  suite('diagonals', () => {
    test('left', () => {
      matrix.getLeftDiagonal().should.eql([0, 11, 22])
    })

    test('right', () => {
      matrix.getRightDiagonal().should.eql([2, 11, 20])
    })
  })

  test('allItems', () => {
    matrix.allItems().should.eql([0, 1, 2, 10, 11, 12, 20, 21, 22])
  })

  suite('format', () => {
    suite('one item matrix', () => {
      const item = 12
      let oneItemMatrix
      setup(() => {
        oneItemMatrix = new ImmutableMatrix([[item]])
      })
      test('is the item for one-item matrix', () => {
        oneItemMatrix.format().should.equal(`${item}`)
      })

      test('pads the item left and right if padding is given', () => {
        oneItemMatrix.format(1).should.equal(` ${item} `)
      })
    })
  })
})
