'use strict'

require('chai').should()

const _ = require('lodash')

const Matrix = require('../../core').Matrix,
  headers = require('../../headers'),
  TableFormatter = require('../src/table')

suite('structures/table', () => {
  suite('one item matrix', () => {
    const item = 12
    let oneItemMatrix
    setup(() => {
      oneItemMatrix = new Matrix([[item]])
    })
    test('is the item for one-item matrix', () => {
      oneItemMatrix.formatWith(TableFormatter()).should.equal(`${item}`)
    })

    test('pads the item left and right if padding is given', () => {
      oneItemMatrix.formatWith(TableFormatter({ padding: 1 })).should.equal(` ${item} `)
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
      oneRowMatrix.formatWith(TableFormatter()).should.equal(`${first} ${second} ${third}`)
    })

    test('joins the items with a custom separator', () => {
      const sep = '|'
      oneRowMatrix.formatWith(TableFormatter({ borders: { vertical: { inner: sep } } }))
        .should.equal(`${first}${sep}${second}${sep}${third}`)
    })

    test('adds padding to each item if specified', () => {
      const sep = '|'
      oneRowMatrix.formatWith(TableFormatter({ padding: 1, borders: { vertical: { inner: sep } } }))
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
        fullMatrix.formatWith(TableFormatter({ borders: { vertical: { inner: '|' } } }))
          .should.equal([
            '0|1|2',
            '3|4|5',
            '6|7|8'
          ].join('\n'))
      })

      test('joins the rows with custom separator, extended to the full row length', () => {
        let borders = {
          vertical: { inner: '|' },
          horizontal: { inner: '-' }
        }
        fullMatrix.formatWith(TableFormatter({ borders })).should.equal([
          '0|1|2',
          '-----',
          '3|4|5',
          '-----',
          '6|7|8'
        ].join('\n'))
      })

      test('joins the rows with custom separators and item paddings', () => {
        let borders = {
          vertical: { inner: '|' },
          horizontal: { inner: '-' }
        }
        fullMatrix.formatWith(TableFormatter({ borders, padding: 1 })).should.equal([
          ' 0 | 1 | 2 ',
          '-----------',
          ' 3 | 4 | 5 ',
          '-----------',
          ' 6 | 7 | 8 '
        ].join('\n'))
      })
    })

    suite('with outer vertical borders', () => {
      let basicTableFormat
      setup(() => {
        basicTableFormat = {
          borders: {
            vertical: { inner: '|' },
            horizontal: { inner: '-' }
          },
          padding: 1
        }
      })

      test('on the left side', () => {
        basicTableFormat.borders.vertical.left = '|'
        let formattedMatrix = fullMatrix.formatWith(TableFormatter(basicTableFormat))
        formattedMatrix.should.equal([
          '| 0 | 1 | 2 ',
          '|-----------',
          '| 3 | 4 | 5 ',
          '|-----------',
          '| 6 | 7 | 8 '
        ].join('\n'))
      })

      test('on the right side', () => {
        basicTableFormat.borders.vertical.right = '|'
        let formattedMatrix = fullMatrix.formatWith(TableFormatter(basicTableFormat))
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
      let basicTableFormat
      setup(() => {
        basicTableFormat = {
          borders: {
            vertical: { inner: '|' },
            horizontal: { inner: '-' }
          },
          padding: 1
        }
      })
      test('top border', () => {
        basicTableFormat.borders.horizontal.top = '-'
        let formattedMatrix = fullMatrix.formatWith(TableFormatter(basicTableFormat))
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
        basicTableFormat.borders.horizontal.top = '-'
        basicTableFormat.borders.vertical.left = '|'
        let formattedMatrix = fullMatrix.formatWith(TableFormatter(basicTableFormat))
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
        basicTableFormat.borders.horizontal.bottom = '-'
        basicTableFormat.borders.vertical.left = '|'
        let formattedMatrix = fullMatrix.formatWith(TableFormatter(basicTableFormat))
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
        _.merge(basicTableFormat.borders, {
          horizontal: { top: '-', bottom: '-' },
          vertical: { left: '|', right: '|' }
        })
        let formattedMatrix = fullMatrix.formatWith(TableFormatter(basicTableFormat))
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
      let basicTableFormat
      setup(() => {
        basicTableFormat = {
          headerMappers: {},
          borders: {
            vertical: { inner: '|' },
            horizontal: {
              top: '-',
              inner: '-',
              bottom: '-'
            }
          },
          padding: 1
        }
      })

      test('as numeric indexes', () => {
        basicTableFormat.headerMappers.row =  headers.Numeric()
        let formattedMatrix = fullMatrix.formatWith(TableFormatter(basicTableFormat))
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
        basicTableFormat.headerMappers.row =  headers.Numeric()
        basicTableFormat.borders.vertical.left = '|'
        let formattedMatrix = fullMatrix.formatWith(TableFormatter(basicTableFormat))
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
        let oneLineMatrix = new Matrix([[0, 1, 2]])
        basicTableFormat.headerMappers.row =  headers.Alphabetic()
        oneLineMatrix.formatWith(TableFormatter(basicTableFormat)).should.equal([
          ' a   b   c ',
          '-----------',
          ' 0 | 1 | 2 ',
          '-----------'
        ].join('\n'))
      })
    })

    suite('with header column', () => {
      let oneColumnMatrix, basicTableFormat
      setup(() => {
        oneColumnMatrix = new Matrix([[0], [3], [6]])
        basicTableFormat = {
          headerMappers: {},
          borders: {
            vertical: { inner: '|' },
            horizontal: {
              top: '-',
              inner: '-',
              bottom: '-'
            }
          },
          padding: 1
        }
      })

      test('numeric', () => {
        basicTableFormat.headerMappers.column =  headers.Numeric(0)
        let formattedMatrix = oneColumnMatrix.formatWith(TableFormatter(basicTableFormat))
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
        basicTableFormat.headerMappers.column =  headers.Alphabetic('i')
        let formattedMatrix = oneColumnMatrix.formatWith(TableFormatter(basicTableFormat))
        formattedMatrix.should.equal([
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
        basicTableFormat.headerMappers.column =  headers.Alphabetic('i')
        basicTableFormat.borders.vertical.left =  '|'
        let formattedMatrix = oneColumnMatrix.formatWith(TableFormatter(basicTableFormat))
        formattedMatrix.should.equal([
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
