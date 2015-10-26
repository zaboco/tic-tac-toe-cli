'use strict'

module.exports = FakePlayerMakersRegistry

function FakePlayerMakersRegistry(fakeType, fakePlayerMaker) {
  return {
    allTypes() {
      return [fakeType]
    },

    find(type) {
      if (type === fakeType) {
        return fakePlayerMaker
      }
    }
  }
}
