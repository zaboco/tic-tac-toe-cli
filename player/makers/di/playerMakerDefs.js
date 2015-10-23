'use strict'

const implementations = require('..')

module.exports = {
  Named(container) {
    return implementations.Named(container.adviser, container.nameChooser, container.nameLabel)
  },

  Simple(container) {
    return implementations.Simple(container.adviser)
  }
}
