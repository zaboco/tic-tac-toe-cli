'use strict'

const Depender = require('./Depender')

let services = new Depender({
  playerMaker: require('../player/makers/di'),
  playerProvider: require('../player/providers/di'),
  nameChooser: require('../choosers/name/di')
})

module.exports = services
