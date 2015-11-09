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

  test('places sign on board at top left', () => {
    const topLeft = [0, 0]
    let newBoard = player.fillCellOnBoard(emptyBoard, topLeft)
    newBoard.getSignAt(topLeft).should.equal(playerSign)
  })

  test('places sign on board at bottom right', () => {
    const bottomRight = [2, 2]
    let newBoard = player.fillCellOnBoard(emptyBoard, bottomRight)
    newBoard.getSignAt(bottomRight).should.equal(playerSign)
  })

  test('toString contains sign', () => {
    player.toString().should.contain(playerSign)
  })
})
