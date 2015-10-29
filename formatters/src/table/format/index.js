'use strict'

const SimpleTableFormat = require('./SimpleTableFormat')

module.exports = makeSimpleFormat
makeSimpleFormat.solid = makeSolidFormat

function makeSimpleFormat(settings) {
  return new SimpleTableFormat(settings)
}

function makeSolidFormat(settings) {
  const defaults = {
    padding: 1,
    verticalSeparator: '|',
    border: {
      top: '-',
      bottom: '-',
      inner: '-'
    }
  }
  settings = Object.assign({}, defaults, settings)
  return new SimpleTableFormat(settings)
}
