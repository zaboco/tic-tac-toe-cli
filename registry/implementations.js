'use strict'

module.exports = {
  playerMakers: require('../player/makers/di'),
  playerProviders: require('../player/providers/di'),
  inputReaders: require('../input/readers/di'),
  inputParsers: require('../input/parsers/di'),
  advisers: require('../advisers/di')
}
