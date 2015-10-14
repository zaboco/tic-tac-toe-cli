'use strict'

const TableStructure = require('./TableStructure'),
  SimpleTableFormat = require('./SimpleTableFormat'),
  HeadersTableFormat = require('./BorderedTableFormat')

exports.simple = function(settings) {
  return new TableStructure(makeSimpleTableFormat(settings))
}

exports.defaultSimple = function() {
  return exports.simple({
    verticalSeparator: '|',
    horizontalSeparator: '-',
    padding: 1
  })
}

exports.withBorders = function(basicSettings, headerSettings) {
  let simpleTableFormat = makeSimpleTableFormat(basicSettings)
  let tableWithHeadersFormat = new HeadersTableFormat(simpleTableFormat, headerSettings)
  return new TableStructure(tableWithHeadersFormat)
}

function makeSimpleTableFormat(settings) {
  settings = Object.assign({}, {
    verticalSeparator: ' ',
    horizontalSeparator: '',
    padding: 0
  }, settings)
  return new SimpleTableFormat(settings)
}
