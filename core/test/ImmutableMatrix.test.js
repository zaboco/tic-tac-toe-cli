'use strict'

require('chai').should()

const ImmutableMatrix = require('../src/matrix/ImmutableMatrix'),
  table = require('../../structures/table')

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

  suite('formatAs', () => {
    suite('one item matrix', () => {
      const item = 12
      let oneItemMatrix
      setup(() => {
        oneItemMatrix = new ImmutableMatrix([[item]])
      })
      test('is the item for one-item matrix', () => {
        oneItemMatrix.formatAs(table.simple()).should.equal(`${item}`)
      })

      test('pads the item left and right if padding is given', () => {
        oneItemMatrix.formatAs(table.simple({ padding: 1 })).should.equal(` ${item} `)
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
        oneRowMatrix.formatAs(table.simple()).should.equal(`${first} ${second} ${third}`)
      })

      test('joins the items with a custom separator', () => {
        const sep = '|'
        oneRowMatrix.formatAs(table.simple({ verticalSeparator: sep }))
          .should.equal(`${first}${sep}${second}${sep}${third}`)
      })

      test('adds padding to each item if specified', () => {
        const sep = '|'
        oneRowMatrix.formatAs(table.simple({ verticalSeparator: sep, padding: 1 }))
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
        fullMatrix.formatAs(table.simple({ verticalSeparator: '|' })).should.equal([
          '0|1|2',
          '3|4|5',
          '6|7|8'
        ].join('\n'))
      })

      test('joins the rows with custom separator, extended to the full row length', () => {
        let customSeparatorsStructure = table.simple({
          verticalSeparator: '|',
          horizontalSeparator: '-'
        })
        fullMatrix.formatAs(customSeparatorsStructure).should.equal([
          '0|1|2',
          '-----',
          '3|4|5',
          '-----',
          '6|7|8'
        ].join('\n'))
      })

      test('joins the rows with custom separators and item paddings', () => {
        let fullTableStructure = table.simple({
          verticalSeparator: '|',
          horizontalSeparator: '-',
          padding: 1
        })
        fullMatrix.formatAs(fullTableStructure).should.equal([
          ' 0 | 1 | 2 ',
          '-----------',
          ' 3 | 4 | 5 ',
          '-----------',
          ' 6 | 7 | 8 '
        ].join('\n'))
      })

      suite('with outer borders', () => {
        const basicTableSettings = {
          verticalSeparator: '|',
          horizontalSeparator: '-',
          padding: 1
        }

        test('on the left side', () => {
          let borderSettings = { left: '|' }
          let borderedTableFormatter = table.withBorders(basicTableSettings, borderSettings)
          let formattedMatrix = fullMatrix.formatAs(borderedTableFormatter)
          formattedMatrix.should.equal([
            '| 0 | 1 | 2 ',
            '|-----------',
            '| 3 | 4 | 5 ',
            '|-----------',
            '| 6 | 7 | 8 '
          ].join('\n'))
        })

        test('on the right side', () => {
          let borderSettings = { right: '|' }
          let borderedTableFormatter = table.withBorders(basicTableSettings, borderSettings)
          let formattedMatrix = fullMatrix.formatAs(borderedTableFormatter)
          formattedMatrix.should.equal([
            ' 0 | 1 | 2 |',
            '-----------|',
            ' 3 | 4 | 5 |',
            '-----------|',
            ' 6 | 7 | 8 |'
          ].join('\n'))
        })
      })
    })
  })
})
