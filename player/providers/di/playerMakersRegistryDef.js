'use strict'

const _ = require('lodash')

const playerMakerDefs = require('./../../makers/di/playerMakerDefs')
const PlayerMakersRegistry = require('../../makers/src/PlayerMakersRegistry')

module.exports = playerMakersRegistryDef

function playerMakersRegistryDef(container) {
  let playerMakerImplementations = _.mapValues(playerMakerDefs, def => def(container))
  return PlayerMakersRegistry(playerMakerImplementations, container.availablePlayerTypes)
}



