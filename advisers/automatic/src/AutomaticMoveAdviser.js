'use strict'

module.exports = class AutomaticMoveAdviser {
  constructor(algorithm) {
    this.algorithm = algorithm
  }

  coordsFor(board, sign) {
    return Promise.resolve(this.algorithm.findBestMoveFor(board, sign))
  }
}
