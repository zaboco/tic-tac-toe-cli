'use strict'

const implementations = require('.')

module.exports = {
  Headers(container) {
    return implementations.Headers({
      row: container.rowHeaderMapper,
      column: container.columnHeaderMapper
    })
  }
}
