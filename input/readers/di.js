'use strict'

const implementations = require('.')

module.exports = {
  Text(container) {
    return implementations.Text(container.message)
  },

  List(container) {
    return implementations.List(container.message, container.choices)
  },

  Static(container) {
    return implementations.Static(container.value)
  }
}
