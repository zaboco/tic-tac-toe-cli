'use strict'

module.exports = class StaticMoveAdviser {
  setNextAdvice(coords) {
    this.coords = coords
    return this
  }

  coordsFor() {
    return Promise.resolve(this.coords)
  }
}
