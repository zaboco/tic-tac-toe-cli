'use strict'

const co = require('co')

const askForPlayerDetails = require('./askForPlayerDetails')

co(function* () {
  const firstPlayerFields = yield askForPlayerDetails('X')
  const secondPlayerFields = yield askForPlayerDetails('O')
  console.log('firstPlayer', firstPlayerFields)
  console.log('secondPlayer', secondPlayerFields)
})
