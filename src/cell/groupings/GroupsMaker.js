'use strict'

const groupings = require('.')

class GroupsMaker {
  from(matrix) {
    return allGroupers().map(grouper => grouper(matrix))
  }
}

function allGroupers() {
  return [
    [0, 1, 2].map(groupings.row),
    [0, 1, 2].map(groupings.column),
    ['left', 'right'].map(groupings.diagonal)
  ].reduce((a, b) => a.concat(b))
}

module.exports = new GroupsMaker()
