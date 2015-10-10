'use strict'

const co = require('co')

const askForPlayerDetails = require('./askForPlayerDetails'),
  makePlayerName = require('./src/makePlayerName')

co(function* () {
  const firstPlayerFields = yield willMakePlayerFields('X')
  const secondPlayerFields = yield willMakePlayerFields('O')
  console.log('firstPlayer', firstPlayerFields)
  console.log('secondPlayer', secondPlayerFields)
})

const typeAbbreviations = {
  Human: 'H',
  Computer: 'AI'
}

function willMakePlayerFields(sign) {
  return co(function* () {
    const rawFields = yield askForPlayerDetails(sign)
    const type = rawFields.type
    const fullName = makePlayerName(rawFields.name, sign, typeAbbreviations[type])
    return { type, name: fullName }
  })
}
