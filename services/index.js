'use strict'

const Depender = require('./Depender')

let services = new Depender({
  playerMaker: require('../player/makers/di'),
  playerProvider: require('../player/providers/di'),
  inputReader: require('../input/readers/di'),
  inputParser: require('../input/parsers/di'),
  adviser: require('../advisers/di')
})

module.exports = services
