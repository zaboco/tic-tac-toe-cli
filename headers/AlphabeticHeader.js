'use strict'

module.exports = class AlphabeticHeader {
  constructor(startingLetter) {
    this.startingLetter = startingLetter || 'a'
  }

  fromIndex(index) {
    return letterAfter(this.startingLetter, index)
  }

  toIndex(headerLetter) {
    return charOffset(headerLetter, this.startingLetter)
  }
}

function letterAfter(baseLetter, distance) {
  let baseCode = baseLetter.charCodeAt(0)
  return String.fromCharCode(baseCode + distance)
}

function charOffset(char, baseChar) {
  return [char, baseChar]
    .map(char => char.charCodeAt(0))
    .reduce((code, baseCode) => code - baseCode)
}
