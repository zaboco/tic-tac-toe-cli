'use strict'

const implementations = require('.')

module.exports = {
  DummySolver() {
    return implementations.DummySolver()
  },

  Reader(container) {
    return implementations.Reader(container.inputReader, container.inputParser)
  }
}
