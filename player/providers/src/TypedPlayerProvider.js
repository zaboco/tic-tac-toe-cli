'use strict'

const wco = require('co').wrap

module.exports = TypedPlayerProvider

function TypedPlayerProvider(deps) {
  return wco(function* providePlayer(sign) {
    let registry = deps.playerMakersRegistry
    let type = yield deps.typeReader()
    let PlayerMaker = registry.find(type)
    return PlayerMaker(sign)
  })
}
