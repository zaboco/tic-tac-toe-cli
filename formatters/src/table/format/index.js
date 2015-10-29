'use strict'

const SimpleTableFormat = require('./SimpleTableFormat')

module.exports = makeSimpleFormat

function makeSimpleFormat(settings) {
  return new SimpleTableFormat(settings)
}
