'use strict'

require('chai').should()

const _ = require('lodash')

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
          border: { inner: '-' }
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
          padding: 1,
          border: { inner: '-' }
        })
        fullMatrix.formatAs(fullTableStructure).should.equal([
          ' 0 | 1 | 2 ',
          '-----------',
          ' 3 | 4 | 5 ',
          '-----------',
          ' 6 | 7 | 8 '
        ].join('\n'))
      })

      suite('with outer vertical borders', () => {
        const basicTableSettings = {
          verticalSeparator: '|',
          padding: 1,
          border: { inner: '-' }
        }

        test('on the left side', () => {
          let borderModifier = table.modifiers.border({ left: '|' })
          let borderedTableFormatter = table.custom(basicTableSettings, borderModifier)
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
          let borderModifier = table.modifiers.border({ right: '|' })
          let borderedTableFormatter = table.custom(basicTableSettings, borderModifier)
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

      suite('with outer horizontal borders', () => {
        const basicTableSettings = {
          verticalSeparator: '|',
          padding: 1,
          border: { inner: '-' }
        }
        test('top border', () => {
          let settingsWithTopBorder = _.merge({}, basicTableSettings, { border: { top: '-' } })
          let formattedMatrix = fullMatrix.formatAs(table.simple(settingsWithTopBorder))
          formattedMatrix.should.equal([
            '-----------',
            ' 0 | 1 | 2 ',
            '-----------',
            ' 3 | 4 | 5 ',
            '-----------',
            ' 6 | 7 | 8 '
          ].join('\n'))
        })

        test('top border has margin if left border is present', () => {
          let settingsWithTopBorder = _.merge({}, basicTableSettings, { border: { top: '-' } })
          let borderModifier = table.modifiers.border({ left: '|' })
          let tableStructure = table.custom(settingsWithTopBorder, borderModifier)
          let formattedMatrix = fullMatrix.formatAs(tableStructure)
          formattedMatrix.should.equal([
            ' -----------',
            '| 0 | 1 | 2 ',
            '|-----------',
            '| 3 | 4 | 5 ',
            '|-----------',
            '| 6 | 7 | 8 '
          ].join('\n'))
        })

        test('bottom border', () => {
          let settings = _.merge({}, basicTableSettings, { border: { bottom: '-' } })
          let borderModifier = table.modifiers.border({ left: '|' })
          let tableStructure = table.custom(settings, borderModifier)
          let formattedMatrix = fullMatrix.formatAs(tableStructure)
          formattedMatrix.should.equal([
            '| 0 | 1 | 2 ',
            '|-----------',
            '| 3 | 4 | 5 ',
            '|-----------',
            '| 6 | 7 | 8 ',
            ' -----------'
          ].join('\n'))
        })

        test('with all borders', () => {
          const vertical = '|', horizontal = '-'
          let settings = {
            verticalSeparator: vertical,
            padding: 1,
            border: {
              inner: horizontal,
              bottom: horizontal,
              top: horizontal
            }
          }
          let borderModifier = table.modifiers.border({ left: vertical, right: vertical })
          let tableStructure = table.custom(settings, borderModifier)
          let formattedMatrix = fullMatrix.formatAs(tableStructure)
          formattedMatrix.should.equal([
            ' -----------',
            '| 0 | 1 | 2 |',
            '|-----------|',
            '| 3 | 4 | 5 |',
            '|-----------|',
            '| 6 | 7 | 8 |',
            ' -----------'
          ].join('\n'))
        })
      })
    })
  })
})
