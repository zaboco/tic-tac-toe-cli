'use strict'

const definitions = require('./playerMakerDefs')

module.exports = { register }

function register(container, implementationKey) {
  let chosenDefinition = definitions[implementationKey]
  container.set('playerMaker', chosenDefinition)
}
