'use strict'

const _ = require('lodash')

module.exports = class FormattedRow {
  constructor(parts) {
    this.body = parts.body
    this.prefix = parts.prefix || ''
    this.suffix = parts.suffix || ''
  }

  getBodyLength() {
    return this.body.length
  }

  prepend(prefix) {
    return new FormattedRow({
      body: this.body,
      prefix: prefix,
      suffix: this.suffix
    })
  }

  append(suffix) {
    return new FormattedRow({
      body: this.body,
      prefix: this.prefix,
      suffix: suffix
    })
  }

  insertBefore(otherRows) {
    if (_.isEmpty(this.body)) {
      return otherRows
    }
    else {
      return [this].concat(otherRows)
    }
  }

  toString() {
    return `${this.prefix}${this.body}${this.suffix}`
  }
}
