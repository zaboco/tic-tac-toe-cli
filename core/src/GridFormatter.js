'use strict'

module.exports = GridFormatter

const _ = require('lodash')

function GridFormatter(options) {
  options = _.defaults({}, options, {
    padding: 0,
    verticalSeparator: ' '
  })

  return function format(matrix) {
    let rows = matrix.allRows().map(formatRow)
    let rowSize = rows[0].length
    return rows.join(makeRowSeparator(rowSize))
  }

  function makeRowSeparator(rowSize) {
    if (options.horizontalSeparator == null) {
      return '\n'
    }
    let rowSeparator = _.repeat(options.horizontalSeparator, rowSize)
    return `\n${rowSeparator}\n`
  }

  function formatRow(row) {
    return row.map(formatItem).join(options.verticalSeparator)
  }

  function formatItem(item) {
    return _.pad(item, options.padding * 2 + 1)
  }
}

GridFormatter.standard = GridFormatter({
  padding: 1,
  verticalSeparator: '│',
  horizontalSeparator: '─'
})
