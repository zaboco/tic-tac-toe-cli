'use strict'

require('chai').should()

const wco = require('co').wrap

const services = require('../../services'),
  Board = require('../src/board')

const someSign = 'X'

suite('Player', function() {
  this.timeout(100)

  let emptyBoard
  suiteSetup(() => {
    services.choose('playerMaker', 'Fake')
    emptyBoard = Board.empty()
  })

  let player
  setup(wco(function*() {
    player = yield services.playerMaker(someSign)
  }))

  test('can choose coordinates for a board', done => {
    const someCoords = [1, 0]
    player.willChooseCoordsFor(emptyBoard).then(coords => {
      coords.should.equal(someCoords)
      done()
    })
    player.chooseCoords(someCoords)
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

  test('toString contains sign', () => {
    player.toString().should.contain(someSign)
  })
})
