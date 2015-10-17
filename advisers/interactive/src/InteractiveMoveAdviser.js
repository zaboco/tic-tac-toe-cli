'use strict'

const PostValidatedParser = require('./PostValidatedParser'),
  CoordsValidator = require('./CoordsValidator')

module.exports = class InteractiveMoveAdviser {
  constructor(inputSource, coordsParser) {
    this.inputSource = inputSource
    this.coordsParser = coordsParser
  }

  coordsFor(board) {
    let postValidator = CoordsValidator(board)
    let fullParser = new PostValidatedParser(this.coordsParser, postValidator)
    return this.inputSource.readWith(fullParser)
  }
}
