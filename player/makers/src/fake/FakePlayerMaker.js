'use strict'

module.exports = FakePlayerMaker

const FakePlayer = require('./FakePlayer')

function FakePlayerMaker() {
  return function makePlayer(sign) {
    return Promise.resolve(new FakePlayer(sign))
  }
}
