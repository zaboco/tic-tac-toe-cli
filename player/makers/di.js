'use strict'

const implementations = require('.')

module.exports = {
  Typed(container) {
    return implementations.Typed(container.typeReader, container.playerTemplates)
  },

  Named(container) {
    return implementations.Named(container.adviser, container.nameReader, container.nameLabel)
  },

  Simple(container) {
    return implementations.Simple(container.adviser)
  }
}
