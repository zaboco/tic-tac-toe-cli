'use strict'

const implementations = require('..')

module.exports = {
  Fake(container) {
    return implementations.Fake(container.fakePlayerName)
  }
}
