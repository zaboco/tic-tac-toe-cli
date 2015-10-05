'use strict'

const wco = require('co').wrap

require('chai').should()

const Player = require('../src/Player'),
  Board = require('../src/board/Board')

const someSign = 'X',
  emptyBoard = Board.empty()

const staticMoveAdviser = {
  setNextAdvice(coords) {
    this.coords = coords
    return this
  },

  coordsFor() {
    return Promise.resolve(this.coords)
  }
}

suite('Player', () => {
  let player
  setup(() => {
    player = Player(someSign, staticMoveAdviser)
  })

  test('places sign on board at top left', wco(function* () {
    const topLeft = [0, 0]
    staticMoveAdviser.setNextAdvice(topLeft)
    let newBoard = yield player.fillCellOnBoard(emptyBoard)
    newBoard.getSignAt(topLeft).should.equal(someSign)
  }))

  test('places sign on board at top left', wco(function* () {
    const bottomRight = [2, 2]
    staticMoveAdviser.setNextAdvice(bottomRight)
    let newBoard = yield player.fillCellOnBoard(emptyBoard)
    newBoard.getSignAt(bottomRight).should.equal(someSign)
  }))
})
