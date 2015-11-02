'use strict'

module.exports = NamedPlayerMaker

const wco = require('co').wrap
const _ = require('lodash')

const NamedPlayer = require('./NamedPlayer')

function NamedPlayerMaker(adviser, nameReader, nameLabel) {
  return wco(function* makePlayer(sign) {
    let name = yield nameReader()
    let fullName = _.compact([nameLabel, name]).join(': ')
    return new NamedPlayer(sign, adviser, `[${fullName}]`)
  })
}
