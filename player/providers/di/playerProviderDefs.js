'use strict'

const implementations = require('..')

module.exports = {
  Typed(container) {
    return implementations.Typed({
      typeReader: container.typeReader,
      playerMakersRegistry: container.playerMakersRegistry
    })
  }
}
