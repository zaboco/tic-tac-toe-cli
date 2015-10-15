'use strict'

const FormattedBlock = require('./FormattedBlock')

module.exports = class TableStructure {
  constructor(formatter) {
    this.formatter = formatter
  }

  format(matrix) {
    let coreBlock = this._buildCoreBlock(matrix)
    let blockWidth = coreBlock.getWidth()
    let itemsCount = matrix.getRow(0).length
    var formattedBlock = coreBlock
      .interleave(this.formatter.innerBorder(blockWidth))
      .prependRow(this.formatter.topBorder(blockWidth))
      .prependRow(this.formatter.headerRow(itemsCount))
      .appendRow(this.formatter.bottomBorder(blockWidth))
    return formattedBlock.join('\n')
  }

  _buildCoreBlock(matrix) {
    let formattedItemRows = matrix.allRows().map(this._formatRow.bind(this))
    return new FormattedBlock(formattedItemRows)
  }

  _formatRow(row, rowIndex) {
    var formattedItems = row.map(it => this.formatter.item(it))
    return this.formatter.row(formattedItems, rowIndex)
  }

  static use(formatter) {
    return new TableStructure(formatter)
  }
}
