'use strict'

const definitions = require('./nameChooserDefs')

module.exports = { register }

function register(container, implementationKey) {
  let chosenDefinition = definitions[implementationKey]
  container.set('nameChooser', chosenDefinition)
}
