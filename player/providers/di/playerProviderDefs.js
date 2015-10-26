'use strict'

const _ = require('lodash')

const implementations = require('..')

module.exports = {
  Typed(container) {
    return implementations.Typed({
      typeReader: container.typeReader,
      playerMakersRegistry: registryFromTypeDefinitions(container)
    })
  }
}

function registryFromTypeDefinitions(container) {
  return _.mapValues(container.playerTypes, Type => Type.playerMaker)
}
