'use strict'

const TableStructure = require('./TableStructure'),
  SimpleTableFormat = require('./SimpleTableFormat')

exports.simple = function(settings) {
  settings = Object.assign({}, {
    verticalSeparator: ' ',
    horizontalSeparator: '',
    padding: 0
  }, settings)
  return new TableStructure(new SimpleTableFormat(settings))
}

exports.defaultSimple = function() {
  return exports.simple({
    verticalSeparator: '|',
    horizontalSeparator: '-',
    padding: 1
  })
}
