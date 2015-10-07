'use strict'

require('chai').should()

const Player = require('../src/Player'),
  Board = require('../src/board/Board'),
  ManualMoveAdviser = require('../../advisers/manual')

const someSign = 'X',
  emptyBoard = Board.empty()

const manualMoveAdviser = new ManualMoveAdviser()

suite('Player', function() {
  this.timeout(100)

  let player
  setup(() => {
    player = new Player(someSign, manualMoveAdviser)
  })

  test('can choose coordinates for a board', done => {
    const someCoords = [1, 0]
    player.willChooseCoordsFor(emptyBoard).then(coords => {
      coords.should.equal(someCoords)
      done()
    })
    manualMoveAdviser.triggerAdvice(someCoords)
  })

  test('places sign on board at top left', () => {
    const topLeft = [0, 0]
    let newBoard = player.fillCellOnBoard(emptyBoard, topLeft)
    newBoard.getSignAt(topLeft).should.equal(someSign)
  })

  test('places sign on board at top left', () => {
    const bottomRight = [2, 2]
    var newBoard = player.fillCellOnBoard(emptyBoard, bottomRight)
    newBoard.getSignAt(bottomRight).should.equal(someSign)
  })
})
