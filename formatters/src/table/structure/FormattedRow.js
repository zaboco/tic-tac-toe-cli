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

  prepend(extraPrefix) {
    return new FormattedRow({
      body: this.body,
      prefix: `${extraPrefix}${this.prefix}`,
      suffix: this.suffix
    })
  }

  append(extraSuffix) {
    return new FormattedRow({
      body: this.body,
      prefix: this.prefix,
      suffix: `${this.suffix}${extraSuffix}`
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

  insertAfter(otherRows) {
    if (_.isEmpty(this.body)) {
      return otherRows
    }
    else {
      return otherRows.concat(this)
    }
  }

  toString() {
    return `${this.prefix}${this.body}${this.suffix}`
  }
}
