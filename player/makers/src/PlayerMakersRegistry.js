'use strict'

module.exports = PlayerMakersRegistry

function PlayerMakersRegistry(playerMakersMapping, availableTypes) {
  return {
    allTypes() {
      return availableTypes
    },

    find(type) {
      return playerMakersMapping[type]
    }
  }
}
