'use strict'

const deependr = require('deependr')
const $$ = deependr.components.factory.predefinedFrom(require('./implementations'))

let headerMappers = deependr.container({
  row: $$('headerMappers.Alphabetic'),
  column: $$('headerMappers.Numeric')
})

let playerTemplates = deependr.container({
  Human: $$('playerMakers.Named', {
    adviser: $$('advisers.Reader', {
      coordsReader: $$('inputReaders.Text', { message: 'Choose empty cell' }),
      parser: $$('inputParsers.Headers', { headerMappers })
    }),
    nameReader: $$('inputReaders.Text', { message: 'Name' }),
    nameLabel: 'H'
  }),
  Computer: $$('playerMakers.Computer', {
    adviser: $$('advisers.DummySolver'),
    nameReader: $$('inputReaders.Empty'),
    nameLabel: 'AI 0'
  })
})

let registry = deependr.container({
  playerMaker: $$('playerMakers.Typed', {
    playerTemplates,
    typeReader: $$('inputReaders.List', { message: 'Choose type', choices: ['Human', 'Computer'] })
  })
})

registry.$$ = deependr.components.factory.predefinedFrom(require('./implementations'))


module.exports = registry
