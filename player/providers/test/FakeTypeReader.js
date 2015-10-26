'use strict'

module.exports = FakeTypeReader

function FakeTypeReader(type) {
  return function readType() {
    return Promise.resolve(type)
  }
}
