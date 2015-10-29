'use strict'

const _ = require('lodash')

const TableFormatter = require('./src/table')

module.exports = {
  Table(container) {
    return TableFormatter(_.pick(container, 'headerMappers', 'borders', 'padding'))
  }
}
