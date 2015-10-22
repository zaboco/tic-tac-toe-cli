'use strict'

const definitions = require('./playerProviderDefs')

module.exports = { register }

function register(container, implementationKey) {
  let chosenDefinition = definitions[implementationKey]
  container.set('playerProvider', chosenDefinition)
}
