'use strict'

const _ = require('lodash')

const TextInputSource = require('./sources').Text,
  HeadersParser = require('./parsers').Headers,
  TextInputProcessor = require('./processors/TextInputProcessor'),
  headers = require('../headers')

module.exports = { coordsFromHeaders }

function coordsFromHeaders(settings) {
  settings = _.merge({}, _defaultSettings(), settings)
  let inputSource = new TextInputSource(settings.message)
  let headersParser = new HeadersParser({
    column: headers[settings.headers.column](),
    row: headers[settings.headers.row]()
  })
  return new TextInputProcessor(inputSource, headersParser)
}

function _defaultSettings() {
  return {
    message: 'Choose an empty cell ([column letter][row digit], e.g. a3)',
    headers: {
      column: 'Alphabetic',
      row: 'Numeric'
    }
  }
}
