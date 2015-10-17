'use strict'

const _ = require('lodash')

module.exports = class HeadersParser {
  constructor(headersMapping) {
    this.columnHeader = headersMapping.column
    this.rowHeader = headersMapping.row
  }

  parse(headersString) {
    let columnLetter = headersString[0].toLowerCase()
    let rowNumber = headersString[1]
    return [
      this.rowHeader.toIndex(rowNumber),
      this.columnHeader.toIndex(columnLetter)
    ]
  }

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
