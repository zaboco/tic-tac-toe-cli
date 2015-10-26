'use strict'

const implementations = require('.')

module.exports = {
  Text(container) {
    return implementations.Text(container.promptMessage)
  },

  List(container) {
    return implementations.List(container.promptMessage, container.choices)
  }
}
