'use strict'

module.exports = makePlayerName

function makePlayerName(name, sign, typeAbbreviation) {
  if (name === sign) {
    return makeDefaultName(sign, typeAbbreviation)
  }
  else {
    return makeFullName(name, sign, typeAbbreviation)
  }
}

function makeDefaultName(sign, type) {
  return `${sign} [${type}]`
}

function makeFullName(name, sign, type) {
  return `${name} (${sign}) [${type}]`
}
