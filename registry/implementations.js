'use strict'

module.exports = {
  playerMakers: require('../player/makers/di'),
  inputReaders: require('../input/readers/di'),
  inputParsers: require('../input/parsers/di'),
  headerMappers: require('../headers/di'),
  advisers: require('../advisers/di')
}
