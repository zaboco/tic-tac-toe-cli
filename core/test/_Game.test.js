'use strict'

require('chai').should()
const assert = require('chai').assert
require('co-mocha')

const _Game = require('../src/_Game')
const BoardError = require('../src/board/BoardError')
const Board = require('../src/board')

suite('_Game', function() {
  let game, firstPlayer, secondPlayer
  setup(function() {
    firstPlayer = makePlayerStub('X')
    secondPlayer = makePlayerStub('O')
  })

  test('error is thrown for invalid move', function*() {
    try {
      game = new _Game([firstPlayer, secondPlayer])
      yield nextRoundWithMove([4, 5])
    } catch (err) {
      assert.instanceOf(err, BoardError.CellOutsideBoard)
    }
  })

  suite('default game', function() {
    setup(function() {
      game = new _Game([firstPlayer, secondPlayer])
    })

    test('starts with empty board and first player', function() {
      assertOpenGameWith(firstPlayer, Board.empty())
    })


    test('advancing the round works', function*() {
      yield nextRoundWithMove([0, 0])
      assertOpenGameWith(secondPlayer, Board.prefilled.fromRow(['X']))
    })

    test('advancing two rounds works', function*() {
      yield nextRoundWithMove([0, 0])
      yield nextRoundWithMove([0, 1], secondPlayer)
      assertOpenGameWith(firstPlayer, Board.prefilled.fromRow(['X', 'O']))
    })
  })

  suite('game with given board', function() {
    test('has the given board', function() {
      let givenBoard = Board.prefilled.fromRow(['X', 'O'])
      makeGameWithBoard(givenBoard)
      assertOpenGameWith(firstPlayer, givenBoard)
    })

    test('can advance', function*() {
      makeGameWithBoard(Board.prefilled.fromRow(['X', 'O']))
      yield nextRoundWithMove([0, 2])
      assertOpenGameWith(secondPlayer, Board.prefilled.fromRow(['X', 'O', 'X']))
    })
  })

  suite('winning game', function() {
    test('by advancing the round', function*() {
      makeGameWithBoard(Board.prefilled.fromRow(['X', 'X']))
      yield nextRoundWithMove([0, 2])
      assertWonGame(firstPlayer)
    })

    test('by receiving an already won board', function() {
      makeGameWithBoard(Board.prefilled.fromRow(['X', 'X', 'X']))
      assertWonGame(firstPlayer)
    })

    test('prevents further moves on the board when next is called', function*() {
      let winningBoard = Board.prefilled.fromRow(['X', 'X', 'X'])
      makeGameWithBoard(winningBoard)
      yield nextRoundWithMove([1, 0])
      assertFinishedGameWith(firstPlayer, winningBoard)
    })
  })

  suite('tie game', function() {
    let tieBoard
    setup(function() {
      tieBoard = Board.prefilled.fromMatrix([
        ['X', 'O', 'X'],
        ['O', 'X', 'O'],
        ['O', 'X', 'O']
      ])
    })

    test('is handled', function() {
      makeGameWithBoard(tieBoard)
      assertTieGame()
    })

    test('prevents further moves on the board when next is called', function*() {
      makeGameWithBoard(tieBoard)
      yield nextRoundWithMove([5, 5])
      assertFinishedGameWith(firstPlayer, tieBoard)
    })
  })

  function makeGameWithBoard(board) {
    game = new _Game([firstPlayer, secondPlayer], board)
  }

  function nextRoundWithMove(move, player) {
    (player || firstPlayer).addPredefinedMoves([move])
    return game.next()
  }

  function assertOpenGameWith(player, board) {
    _assertGameOpen()
    _assertPlayerAndBoard(player, board)
  }

  function assertFinishedGameWith(player, board) {
    _assertGameNotOpen()
    _assertPlayerAndBoard(player, board)
  }

  function _assertPlayerAndBoard(player, board) {
    assert.equal(game.getCurrentPlayer(), player, 'right player')
    assert.equal(game.getBoard().inspect(), board.inspect(), 'right board')
  }

  function assertWonGame(expectedWinningPlayer) {
    _assertGameNotOpen()
    assert.isFalse(game.isTie(), 'game should not be a tie')
    assert.equal(game.getWinningPlayer(), expectedWinningPlayer, 'right winning player')
  }

  function assertTieGame() {
    _assertGameNotOpen()
    assert.isTrue(game.isTie(), 'game should be a tie')
    assert.isUndefined(game.getWinningPlayer(), 'there should be no winning player')
  }

  function _assertGameOpen() {
    assert.isTrue(game.isOpen(), 'game should be open')
  }

  function _assertGameNotOpen() {
    assert.isFalse(game.isOpen(), 'game should not be open')
  }
})


function makePlayerStub(sign) {
  class PlayerStub {
    constructor(sign) {
      this.sign = sign
      this.predefinedMoves = []
    }

    getSign() {
      return this.sign
    }

    addPredefinedMoves(extraMoves) {
      this.predefinedMoves = extraMoves.concat(this.predefinedMoves)
    }

    findMoveFor() {
      if (!this.predefinedMoves.length) {
        return Promise.reject(Error(`${this.inspect()} has no predefined moves!`))
      }
      let nextMove = this.predefinedMoves.shift()
      return Promise.resolve(nextMove)
    }

    inspect() {
      return `[player ${this.sign}]`
    }
  }

  return new PlayerStub(sign)
}
