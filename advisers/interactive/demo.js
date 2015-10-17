'use strict'

const co = require('co')

const InteractiveMoveAdviser = require('.'),
  HeadersPairParser = InteractiveMoveAdviser.parsers.HeadersPair,
  InquirerTextInput = require('../../inputSources/InquirerTextInput'),
  Board = require('../../core').Board,
  headers = require('../../headers')

const promptMessage = `Choose an empty cell ([column letter][row digit], e.g. a3)`

let headersPairTextInput = new InquirerTextInput(promptMessage)
let headersPairParser = new HeadersPairParser({
  column: headers.Alphabetic(),
  row: headers.Numeric()
})

let adviser = new InteractiveMoveAdviser(headersPairTextInput, headersPairParser)

co(function* () {
  const coords = yield adviser.coordsFor(Board.prefilled.fromRow(['X']))
  console.log(`You have chosen ${coords}`)
})
