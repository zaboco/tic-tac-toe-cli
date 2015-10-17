'use strict'

const co = require('co')

const presets = require('.').presets
const computerAlgorithm = require('../advisers/automatic').algorithms.dummy

const humanOrComputerProvider = presets.HumanOrComputer(computerAlgorithm)

co(function*() {
  let players = yield humanOrComputerProvider.provideForEach('X', 'O')
  console.log(`${players}`)
}).catch(console.error)
