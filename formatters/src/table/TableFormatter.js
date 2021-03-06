'use strict'

module.exports = TableFormatter

const _ = require('lodash')

const Structure = require('./structure')
const Format = require('./format')
const modifiers = require('./modifiers')

function TableFormatter(settings) {
  settings = _.defaults({}, settings, {
    headerMappers: {},
    borders: {
      horizontal: {},
      vertical: {}
    }
  })
  return function(matrix) {
    let basicSettings = {
      padding: settings.padding,
      header: settings.headerMappers.column,
      verticalSeparator: settings.borders.vertical.inner,
      border: settings.borders.horizontal
    }
    let tableFormat = Format(basicSettings)
      .addModifier(modifiers.border({
        left: settings.borders.vertical.left,
        right: settings.borders.vertical.right
      }))
    if (settings.headerMappers.row) {
      tableFormat = tableFormat.addModifier(modifiers.headerColumn(settings.headerMappers.row))
    }
    return Structure.use(tableFormat).format(matrix)
  }
}
