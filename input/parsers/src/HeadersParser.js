'use strict'

const _ = require('lodash')

module.exports = HeadersParser

function HeadersParser(headerMappers) {
  let columnHeaderMapper = headerMappers.column, rowHeaderMapper = headerMappers.row

  return {
    parse(textInput) {
      let columnLetter = textInput[0].toLowerCase()
      let rowNumber = textInput[1]
      return [
        rowHeaderMapper.toIndex(rowNumber),
        columnHeaderMapper.toIndex(columnLetter)
      ]
    },

    preValidate(headersString) {
      if (_.isEmpty(headersString)) {
        return 'The input string cannot be empty'
      }
      if (headersString.length !== 2) {
        return `The input's length must be 2`
      }
      return true
    }
  }
}
