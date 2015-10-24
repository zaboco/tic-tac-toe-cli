'use strict'

const implementations = require('.')

module.exports = {
  Text(container) {
    return implementations.Text(container.promptMessage)
  }
}
