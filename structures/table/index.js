'use strict'

const TableStructure = require('./structure'),
  SimpleTableFormat = require('./format/SimpleTableFormat'),
  CustomTableFormat = require('./format/CustomTableFormat')

exports.simple = function(settings) {
  return new TableStructure(new SimpleTableFormat(settings))
}

exports.custom = function(settings, modifiers) {
  let simpleFormat = new SimpleTableFormat(settings)
  let customFormat = new CustomTableFormat(simpleFormat, modifiers)
  return new TableStructure(customFormat)
}

exports.full = function() {
  const tableSettings = {
    verticalSeparator: '|',
    padding: 1,
    border: {
      inner: '-'
    }
  }
  const borderSettings = {
    left: '|',
    right: '|'
  }
  return exports.custom(tableSettings, border(borderSettings))
}

exports.modifiers = require('./modifiers')

function border(settings) {
  return exports.modifiers.border(settings)
}
