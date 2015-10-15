'use strict'

module.exports = {
  numeric: numericHeader,
  alpha: alphaHeader
}

function numericHeader(startingIndex) {
  startingIndex = (startingIndex != null) ? startingIndex : 1
  return itemIndex => startingIndex + itemIndex
}

function alphaHeader(startingLetter) {
  startingLetter = (startingLetter != null) ? startingLetter : 'a'
  return itemIndex => _letterAfter(startingLetter, itemIndex)
}

function _letterAfter(baseLetter, distance) {
  let baseCode = baseLetter.charCodeAt(0)
  return String.fromCharCode(baseCode + distance)
}
