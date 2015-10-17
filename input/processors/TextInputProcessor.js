'use strict'

const PostValidatedParser = require('../parsers').PostValidated

module.exports = class TextInputProcessor {
  constructor(source, parser) {
    this.source = source
    this.parser = parser
  }

  processWithValidator(validator) {
    let fullParser = new PostValidatedParser(this.parser, validator)
    return this.source.readWith(fullParser)
  }
}
