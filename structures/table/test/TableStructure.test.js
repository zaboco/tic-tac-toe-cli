'use strict'

require('chai').should()

const table = require('..'),
  Matrix = require('../../../core').Matrix,
  headers = require('../../../headers')

suite('structures/table', () => {
  suite('one item matrix', () => {
    const item = 12
    let oneItemMatrix
    setup(() => {
      oneItemMatrix = new Matrix([[item]])
    })
    test('is the item for one-item matrix', () => {
      oneItemMatrix.formatAs(table.Structure, table.format()).should.equal(`${item}`)
    })

    test('pads the item left and right if padding is given', () => {
      oneItemMatrix.formatAs(table.Structure, table.format({ padding: 1 }))
        .should.equal(` ${item} `)
    })
  })

  suite('one row matrix', () => {
    const first = 3, second = 4, third = 5,
      row = [first, second, third]
    let oneRowMatrix
    setup(() => {
      oneRowMatrix = new Matrix([row])
    })

    test('joins the items with a spaces', () => {
      oneRowMatrix.formatAs(table.Structure, table.format())
        .should.equal(`${first} ${second} ${third}`)
    })

    test('joins the items with a custom separator', () => {
      const sep = '|'
      oneRowMatrix.formatAs(table.Structure, table.format({ verticalSeparator: sep }))
        .should.equal(`${first}${sep}${second}${sep}${third}`)
    })

    test('adds padding to each item if specified', () => {
      const sep = '|'
      oneRowMatrix.formatAs(table.Structure, table.format({ verticalSeparator: sep, padding: 1 }))
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
      fullMatrix = new Matrix(matrixSource)
    })

    suite('simple', () => {
      test('joins the rows with new line', () => {
        fullMatrix.formatAs(table.Structure, table.format({ verticalSeparator: '|' }))
          .should.equal([
            '0|1|2',
            '3|4|5',
            '6|7|8'
          ].join('\n'))
      })

      test('joins the rows with custom separator, extended to the full row length', () => {
        let customSeparatorsStructure = table.format({
          verticalSeparator: '|',
          border: { inner: '-' }
        })
        fullMatrix.formatAs(table.Structure, customSeparatorsStructure).should.equal([
          '0|1|2',
          '-----',
          '3|4|5',
          '-----',
          '6|7|8'
        ].join('\n'))
      })

      test('joins the rows with custom separators and item paddings', () => {
        let fullTableStructure = table.format({
          verticalSeparator: '|',
          padding: 1,
          border: { inner: '-' }
        })
        fullMatrix.formatAs(table.Structure, fullTableStructure).should.equal([
          ' 0 | 1 | 2 ',
          '-----------',
          ' 3 | 4 | 5 ',
          '-----------',
          ' 6 | 7 | 8 '
        ].join('\n'))
      })
    })

    suite('with outer vertical borders', () => {
      const verticalBorder = table.modifiers.border
      let basicTableFormat
      setup(() => {
        basicTableFormat = table.format({
          verticalSeparator: '|',
          padding: 1,
          border: { inner: '-' }
        })
      })

      test('on the left side', () => {
        let borderedTableFormatter = basicTableFormat.addModifier(verticalBorder({ left: '|' }))
        let formattedMatrix = fullMatrix.formatAs(table.Structure, borderedTableFormatter)
        formattedMatrix.should.equal([
          '| 0 | 1 | 2 ',
          '|-----------',
          '| 3 | 4 | 5 ',
          '|-----------',
          '| 6 | 7 | 8 '
        ].join('\n'))
      })

      test('on the right side', () => {
        let borderedTableFormatter = basicTableFormat.addModifier(verticalBorder({ right: '|' }))
        let formattedMatrix = fullMatrix.formatAs(table.Structure, borderedTableFormatter)
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
      const verticalBorder = table.modifiers.border
      let basicTableFormat
      setup(() => {
        basicTableFormat = table.format({
          verticalSeparator: '|',
          padding: 1,
          border: { inner: '-' }
        })
      })
      test('top border', () => {
        let formatWithTopBorder = basicTableFormat.withHorizontalBorders({ top: '-' })
        let formattedMatrix = fullMatrix.formatAs(table.Structure, formatWithTopBorder)
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
        let tableFormat = basicTableFormat
          .withHorizontalBorders({ top: '-' })
          .addModifier(verticalBorder({ left: '|' }))
        let formattedMatrix = fullMatrix.formatAs(table.Structure, tableFormat)
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
        let tableFormat = basicTableFormat
          .withHorizontalBorders({ bottom: '-' })
          .addModifier(verticalBorder({ left: '|' }))
        let formattedMatrix = fullMatrix.formatAs(table.Structure, tableFormat)
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
        let tableFormat = basicTableFormat
          .withHorizontalBorders({ top: '-', bottom: '-' })
          .addModifier(verticalBorder({ left: '|', right: '|' }))
        let formattedMatrix = fullMatrix.formatAs(table.Structure, tableFormat)
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

    suite('with header row', () => {
      const verticalBorder = table.modifiers.border

      test('as numeric indexes', () => {
        let formatWithHeaderRow = table.format.solid().withHeaderRow(headers.Numeric())
        let formattedMatrix = fullMatrix.formatAs(table.Structure, formatWithHeaderRow)
        formattedMatrix.should.equal([
          ' 1   2   3 ',
          '-----------',
          ' 0 | 1 | 2 ',
          '-----------',
          ' 3 | 4 | 5 ',
          '-----------',
          ' 6 | 7 | 8 ',
          '-----------'
        ].join('\n'))
      })

      test('aligned if left border is present', () => {
        let formatWithHeaderRow = table.format.solid().withHeaderRow(headers.Numeric())
          .addModifier(verticalBorder({ left: '|' }))
        let formattedMatrix = fullMatrix.formatAs(table.Structure, formatWithHeaderRow)
        formattedMatrix.should.equal([
          '  1   2   3 ',
          ' -----------',
          '| 0 | 1 | 2 ',
          '|-----------',
          '| 3 | 4 | 5 ',
          '|-----------',
          '| 6 | 7 | 8 ',
          ' -----------'
        ].join('\n'))
      })

      test('as alphabetic indexes', () => {
        const alphaHeader = headers.Alphabetic()
        let oneLineMatrix = new Matrix([[0, 1, 2]])
        let formatWithHeaderRow = table.format.solid().withHeaderRow(alphaHeader)
        oneLineMatrix.formatAs(table.Structure, formatWithHeaderRow).should.equal([
          ' a   b   c ',
          '-----------',
          ' 0 | 1 | 2 ',
          '-----------'
        ].join('\n'))
      })
    })

    suite('with header column', () => {
      let oneColumnMatrix
      setup(() => {
        oneColumnMatrix = new Matrix([[0], [3], [6]])
      })

      test('numeric', () => {
        let headerModifier = table.modifiers.headerColumn(headers.Numeric(0))
        let formatWithHeaderRow = table.format.solid().addModifier(headerModifier)
        let formattedMatrix = oneColumnMatrix.formatAs(table.Structure, formatWithHeaderRow)
        formattedMatrix.should.equal([
          '  ---',
          '0  0 ',
          '  ---',
          '1  3 ',
          '  ---',
          '2  6 ',
          '  ---'
        ].join('\n'))
      })

      test('alphabetic', () => {
        let headerModifier = table.modifiers.headerColumn(headers.Alphabetic('i'))
        let formatWithHeaderColumn = table.format.solid().addModifier(headerModifier)
        oneColumnMatrix.formatAs(table.Structure, formatWithHeaderColumn).should.equal([
          '  ---',
          'i  0 ',
          '  ---',
          'j  3 ',
          '  ---',
          'k  6 ',
          '  ---'
        ].join('\n'))
      })

      test('and left border', () => {
        let formatWithHeaderColumnAndBorder = table.format.solid()
          .addModifier(table.modifiers.border({ left: '|' }))
          .addModifier(table.modifiers.headerColumn(headers.Alphabetic('i')))
        oneColumnMatrix.formatAs(table.Structure, formatWithHeaderColumnAndBorder).should.equal([
          '   ---',
          'i | 0 ',
          '  |---',
          'j | 3 ',
          '  |---',
          'k | 6 ',
          '   ---'
        ].join('\n'))
      })
    })
  })

})
