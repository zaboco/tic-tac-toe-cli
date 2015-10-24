'use strict'

module.exports = FakeNameChooser

function FakeNameChooser(name) {
  return function chooseName() {
    return Promise.resolve(name)
  }
}
