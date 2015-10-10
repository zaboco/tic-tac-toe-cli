'use strict'

require('chai').should()

const ImmutableMatrix = require('../src/matrix/ImmutableMatrix'),
  TableFormatter = require('../../formatters/table')

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
        oneItemMatrix.format(new TableFormatter()).should.equal(`${item}`)
      })

      test('pads the item left and right if padding is given', () => {
        oneItemMatrix.format(new TableFormatter({ padding: 1 })).should.equal(` ${item} `)
      })
    })

    suite('one row matrix', () => {
      const first = 3, second = 4, third = 5,
        row = [first, second, third]
      let oneRowMatrix
      setup(() => {
        oneRowMatrix = new ImmutableMatrix([row])
      })

      test('joins the items with a spaces', () => {
        oneRowMatrix.format(new TableFormatter()).should.equal(`${first} ${second} ${third}`)
      })

      test('joins the items with a custom separator', () => {
        const sep = '|'
        oneRowMatrix.format(new TableFormatter({ verticalSeparator: sep }))
          .should.equal(`${first}${sep}${second}${sep}${third}`)
      })

      test('adds padding to each item if specified', () => {
        const sep = '|'
        oneRowMatrix.format(new TableFormatter({ verticalSeparator: sep, padding: 1 }))
          .should.equal(` ${first} ${sep} ${second} ${sep} ${third} `)
      })
    })

    suite('multiple rows matrix', () => {
      const matrixSource = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
      ]
      let fullMatrix
      setup(() => {
        fullMatrix = new ImmutableMatrix(matrixSource)
      })

      test('joins the rows with new line', () => {
        fullMatrix.format(new TableFormatter({ verticalSeparator: '|' })).should.equal([
          '0|1|2',
          '3|4|5',
          '6|7|8'
        ].join('\n'))
      })

      test('joins the rows with custom separator, extended to the full row length', () => {
        let customSeparatorsFormatter = new TableFormatter({
          verticalSeparator: '|',
          horizontalSeparator: '-'
        })
        fullMatrix.format(customSeparatorsFormatter).should.equal([
          '0|1|2',
          '-----',
          '3|4|5',
          '-----',
          '6|7|8'
        ].join('\n'))
      })

      test('joins the rows with custom separators and item paddings', () => {
        let fullFormatter = new TableFormatter({
          verticalSeparator: '|',
          horizontalSeparator: '-',
          padding: 1
        })
        fullMatrix.format(fullFormatter).should.equal([
          ' 0 | 1 | 2 ',
          '-----------',
          ' 3 | 4 | 5 ',
          '-----------',
          ' 6 | 7 | 8 '
        ].join('\n'))
      })
    })
  })
})
