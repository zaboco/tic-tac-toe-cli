'use strict'

module.exports = IdentityParser

function IdentityParser() {
  return Object.create({
    parse(input) {
      return input
    },

    preValidate() {
      return true
    }
  })
}
