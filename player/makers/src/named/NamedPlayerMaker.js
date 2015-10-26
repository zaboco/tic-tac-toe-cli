'use strict'

module.exports = NamedPlayerMaker

const wco = require('co').wrap

const NamedPlayer = require('./NamedPlayer')

function NamedPlayerMaker(adviser, nameReader, nameLabel) {
  return wco(function* makePlayer(sign) {
    let name = yield nameReader()
    return new NamedPlayer(sign, adviser, `${name} [${nameLabel}]`)
  })
}
