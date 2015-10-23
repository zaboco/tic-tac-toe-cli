'use strict'

module.exports = NamedPlayerMaker

const wco = require('co').wrap

const NamedPlayer = require('./NamedPlayer')

function NamedPlayerMaker(adviser, nameChooser, nameLabel) {
  return wco(function* makePlayer(sign) {
    let name = yield nameChooser()
    return new NamedPlayer(sign, adviser, `${name} [${nameLabel}]`)
  })
}
