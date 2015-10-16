'use strict'

module.exports = class HeadersPairTransformer {
  constructor(headersMapping) {
    this.columnHeader = headersMapping.column
    this.rowHeader = headersMapping.row
  }

  parse(headersString) {
    let columnLetter = headersString[0].toLowerCase()
    let rowNumber = headersString[1]
    return {
      row: this.rowHeader.toIndex(rowNumber),
      column: this.columnHeader.toIndex(columnLetter)
    }
  }
}
