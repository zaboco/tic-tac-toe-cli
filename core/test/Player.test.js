'use strict'

const sinon = require('sinon')

require('chai').use(require('sinon-chai')).should()

const Player = require('../src/Player'),
  Board = require('../src/board')

suite('Player', () => {
  const playerSign = 'X'
  let emptyBoard
  suiteSetup(() => {
    emptyBoard = Board.empty()
  })

  let player, adviserSpy
  setup(() => {
    adviserSpy = sinon.spy()
    player = new Player(playerSign, adviserSpy)
  })

  test('forwards coordinates choosing to the adviser', () => {
    player.willChooseCoordsFor(emptyBoard)
    adviserSpy.should.have.been.calledWith(emptyBoard, playerSign)
  })

  test('toString contains sign', () => {
    player.toString().should.contain(playerSign)
  })
})
