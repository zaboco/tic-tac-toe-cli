'use strict'

const co = require('co')

const InteractiveMoveAdviser = require('.'),
  input = require('../../input'),
  Board = require('../../core').Board

let inputProcessor = input.presets.coordsFromHeaders()
let adviser = new InteractiveMoveAdviser(inputProcessor)

co(function* () {
  const coords = yield adviser.coordsFor(Board.prefilled.fromRow(['X']))
  console.log(`You have chosen ${coords}`)
})
