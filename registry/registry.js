'use strict'

const deependr = require('deependr')
const $$ = deependr.components.factory.predefinedFrom(require('./implementations'))

let headerMappers = deependr.container({
  column: $$('headerMappers.Alphabetic'),
  row: $$('headerMappers.Numeric')
})

let playerTemplates = deependr.container({
  Human: $$('playerMakers.Named', {
    adviser: $$('advisers.Reader', {
      coordsReader: $$('inputReaders.Text', { message: 'Choose empty cell (a1-c3)' }),
      coordsParser: $$('inputParsers.Headers', { headerMappers })
    }),
    nameReader: $$('inputReaders.Text', { message: 'Name' }),
    nameLabel: 'H'
  }),
  Computer: $$('playerMakers.Named', {
    adviser: $$('advisers.SmartSolver'),
    nameReader: $$('inputReaders.Static', { value: '' }),
    nameLabel: 'C'
  }),
  Dummy: $$('playerMakers.Named', {
    adviser: $$('advisers.DummySolver'),
    nameReader: $$('inputReaders.Static', { value: '' }),
    nameLabel: '_'
  })
})

let borders = {
  horizontal: {
    top: '─',
    inner: '─',
    bottom:'─'
  },
  vertical: {
    left: '│',
    inner: '│',
    right: '│'
  }
}

let registry = deependr.container({
  headerMappers,
  playerMaker: $$('playerMakers.Typed', {
    playerTemplates,
    typeReader: $$('inputReaders.List', { message: 'Choose type', choices: ['Human', 'Computer'] })
  }),
  boardFormatter: $$('boardFormatters.Table', {
    headerMappers,
    borders,
    padding: 1
  })
})

registry.$$ = deependr.components.factory.predefinedFrom(require('./implementations'))

module.exports = registry
