'use strict'

module.exports = StaticReader

function StaticReader(value) {
  return function read() {
    return Promise.resolve(value)
  }
}
