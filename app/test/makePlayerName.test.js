'use strict'

require('chai').should()

const makePlayerNames = require('../src/makePlayerName')

suite('makePlayerNames', () => {
  const someSign = 'X', someTypeAbbreviation = 'AI'

  test('ignores sign when equal to name', () => {
    makePlayerNames(someSign, someSign, someTypeAbbreviation)
      .should.equal(`${someSign} [${someTypeAbbreviation}]`)
  })

  const someName = 'Player'
  test('makes full name when sign is different from name', () => {
    makePlayerNames(someName, someSign, someTypeAbbreviation)
      .should.equal(`${someName} (${someSign}) [${someTypeAbbreviation}]`)
  })
})
