'use strict'

const groupings = require('.')

class GroupsMaker {
  from(matrix) {
    return allGroupers().map(grouper => grouper(matrix))
  }
}

function allGroupers() {
  return [
    groupings._rowGrouping(0),
    groupings._rowGrouping(1),
    groupings._rowGrouping(2),
    groupings._columnGrouping(0),
    groupings._columnGrouping(1),
    groupings._columnGrouping(2),
    groupings._diagonalGrouping('left'),
    groupings._diagonalGrouping('right')
  ]
}

module.exports = new GroupsMaker()
