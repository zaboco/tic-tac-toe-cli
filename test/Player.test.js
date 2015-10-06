'use strict'

require('chai').should()

const Player = require('../src/Player'),
  Board = require('../src/board/Board'),
  ManualMoveAdviser = require('./ManualMoveAdviser')

const someSign = 'X',
  emptyBoard = Board.empty()

const manualMoveAdviser = new ManualMoveAdviser()

suite('Player', function() {
  this.timeout(100)

  let player
  setup(() => {
    player = Player(someSign, manualMoveAdviser)
  })

  test('places sign on board at top left', () => {
    const topLeft = [0, 0]
    player.fillCellOnBoard(emptyBoard).then(newBoard => {
      newBoard.getSignAt(topLeft).should.equal(someSign)
    })
    return manualMoveAdviser.triggerAdvice(topLeft)
  })

  test('places sign on board at top left', () => {
    const bottomRight = [2, 2]
    player.fillCellOnBoard(emptyBoard).then(newBoard => {
      newBoard.getSignAt(bottomRight).should.equal(someSign)
    })
    manualMoveAdviser.triggerAdvice(bottomRight)
  })
})
