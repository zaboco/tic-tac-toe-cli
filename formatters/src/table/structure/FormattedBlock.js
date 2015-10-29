'use strict'

module.exports = class FormattedBlock {
  constructor(formattedRows) {
    this.rows = formattedRows
  }

  prependRow(row) {
    return new FormattedBlock(row.insertBefore(this.rows))
  }

  appendRow(row) {
    return new FormattedBlock(row.insertAfter(this.rows))
  }

  interleave(row) {
    let newRows = this._tail().reduce((extendedArray, item) => {
      return extendedArray.concat(row.insertBefore([item]))
    }, [this._head()])
    return new FormattedBlock(newRows)
  }

  join(separator) {
    return this.rows.join(separator)
  }

  getWidth() {
    return this._head().getBodyLength()
  }

  _head() {
    return this.rows[0]
  }

  _tail() {
    return this.rows.slice(1)
  }
}
