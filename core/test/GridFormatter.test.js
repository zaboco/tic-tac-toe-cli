'use strict'

require('chai').should()

const GridFormatter = require('../src/GridFormatter')
const Matrix = require('../src/matrix')

suite('GridFormatter', () => {
  suite('one item matrix', () => {
    const item = 1
    let oneItemMatrix
    setup(() => {
      oneItemMatrix = new Matrix([[item]])
    })
    test('is the item for one-item matrix', () => {
      oneItemMatrix.formatWith(GridFormatter())
        .should.equal(`${item}`)
    })

    test('pads the item left and right if padding is given', () => {
      oneItemMatrix.formatWith(GridFormatter({ padding: 1 }))
        .should.equal(` ${item} `)
    })
  })

  suite('one row matrix', () => {
    let oneRowMatrix
    setup(() => {
      oneRowMatrix = new Matrix([[0, 1, 2]])
    })

    test('joins the items with spaces', () => {
      oneRowMatrix.formatWith(GridFormatter())
        .should.equal(`0 1 2`)
    })

    test('joins the items with a custom vertical separator', () => {
      oneRowMatrix.formatWith(GridFormatter({ verticalSeparator: '|' }))
        .should.equal(`0|1|2`)
    })

    test('adds padding to each item if specified', () => {
      oneRowMatrix.formatWith(GridFormatter({ verticalSeparator: '|', padding: 1 }))
        .should.equal(` 0 | 1 | 2 `)
    })
  })

  suite('one column matrix', () => {
    let oneColumnMatrix
    setup(() => {
      oneColumnMatrix = new Matrix([[0], [3], [6]])
    })

    test('joins the rows with new lines', () => {
      oneColumnMatrix.formatWith(GridFormatter())
        .should.equal(`0\n3\n6`)
    })

    test('joins the rows with a custom horizontal separator', () => {
      oneColumnMatrix.formatWith(GridFormatter({ horizontalSeparator: '-' }))
        .should.equal([
          '0',
          '-',
          '3',
          '-',
          '6'
        ].join('\n'))
    })

    test('adds padding to each item if specified', () => {
      oneColumnMatrix.formatWith(GridFormatter({ horizontalSeparator: '-', padding: 1 }))
        .should.equal([
          ' 0 ',
          '---',
          ' 3 ',
          '---',
          ' 6 '
        ].join('\n'))
    })
  })

  test('3x3 matrix with cell padding and both vertical and horizontal separators', () => {
    let matrix = new Matrix([
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ])
    let formatter = GridFormatter({
      padding: 1,
      horizontalSeparator: '-',
      verticalSeparator: '|'
    })
    matrix.formatWith(formatter).should.equal([
      ' 0 | 1 | 2 ',
      '-----------',
      ' 3 | 4 | 5 ',
      '-----------',
      ' 6 | 7 | 8 '
    ].join('\n'))
  })
})
