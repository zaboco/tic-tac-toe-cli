'use strict'

module.exports = TypedPlayerMaker

const wco = require('co').wrap

function TypedPlayerMaker(typeReader, playerTemplates) {
  return wco(function* providePlayer(sign) {
    let type = yield typeReader()
    let PlayerMaker = playerTemplates.get(type)
    return PlayerMaker(sign)
  })
}
