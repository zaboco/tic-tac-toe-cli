'use strict'

const implementations = require('..')

module.exports = {
  Named(container) {
    return implementations.Named(container.adviser, container.nameReader, container.nameLabel)
  },

  Simple(container) {
    return implementations.Simple(container.adviser)
  },

  Fake() {
    return implementations.Fake()
  }
}
