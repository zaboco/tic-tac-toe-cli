'use strict'

const implementations = require('.')

module.exports = {
  Headers(container) {
    return implementations.Headers(container.headerMappers)
  }
}
