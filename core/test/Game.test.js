'use strict'

require('chai').use(require('chai-as-promised')).should()

const FakeGame = require('./fakes/FakeGame'),
  FakePlayer = require('./fakes/FakePlayer'),
  BoardError = require('../src/board/BoardError')

suite('Game', function() {
  this.timeout(10)

  const X = 'X', O = 'O', _ = null
  let game, firstPlayer, secondPlayer

  setup(() => {
    firstPlayer = new FakePlayer(X)
    secondPlayer = new FakePlayer(O)
    game = new FakeGame([firstPlayer, secondPlayer])
  })

  suite('on run', () => {
    test('the game starts', () => {
      let gameStart = waitFor('game.start')
      game.run()
      return gameStart
    })

    test('first round starts with first player', () => {
      let roundStart = waitFor('round.start')
      game.run()
      return roundStart.should.eventually.equal(firstPlayer)
    })
  })

  suite('after first player chooses coords', () => {
    const someCoords = [0, 0]
    setup(() => {
      game.run()
    })

    test('board error is emitted if wrong move', () => {
      let gameError = waitFor('error')
      firstPlayer.makeWrongMove()
      return gameError.should.eventually.be.instanceOf(BoardError)
    })

    test('first round ends with the first player and updated board', () => {
      let roundEnd = waitForRoundEnd()
      firstPlayer.makeMove(someCoords)
      return assertPlayerHasMoved(roundEnd, firstPlayer, someCoords)
    })

    test('second round starts with the second player', () => {
      let roundStart = waitFor('round.start')
      firstPlayer.makeMove(someCoords)
      return roundStart.should.eventually.equal(secondPlayer)
    })
  })

  suite('after second player chooses coords', () => {
    const firstCoords = [0, 0], secondCoords = [0, 1]

    setup(() => {
      game.run()
      firstPlayer.makeMove(firstCoords)
      return secondPlayer.waitUntilAsked()
    })

    test('second round ends with the second player', () => {
      let roundEnd = waitForRoundEnd()
      secondPlayer.makeMove(secondCoords)
      return assertPlayerHasMoved(roundEnd, secondPlayer, secondCoords)
    })

    test('third round starts with the first player', () => {
      let roundStart = waitFor('round.start')
      secondPlayer.makeMove(secondCoords)
      return roundStart.should.eventually.equal(firstPlayer)
    })
  })

  suite('end game', () => {
    const winningCoords = [2, 2], tieCoords = [2, 1]
    setup(() => {
      game.fillBoardFromMatrix([
        [X, O, O],
        [O, X, X],
        [X, _, _]
      ])
      game.run()
    })

    test('round ends and first player wins for a good move', () => {
      let gameWonAtEndOfRound = waitForGameWonAtEndOfRound()
      firstPlayer.makeMove(winningCoords)
      return gameWonAtEndOfRound.should.eventually.equal(firstPlayer)
    })

    test('round ends and it is a tie for a bad move', () => {
      let gameTieAtEndOfRound = waitForGameTieAtEndOfRound()
      makeMovesOfBothPlayers(tieCoords, winningCoords)
      return gameTieAtEndOfRound
    })

  })

  function makeMovesOfBothPlayers(firstCoords, secondCoords) {
    firstPlayer.makeMove(firstCoords)
    secondPlayer.waitUntilAsked().then(() => secondPlayer.makeMove(secondCoords))
  }

  function waitForGameWonAtEndOfRound() {
    let gameWon = waitFor('game.won')
    return waitForRoundEnd().then(() => gameWon)
  }

  function waitForGameTieAtEndOfRound() {
    let gameTie = waitFor('game.tie')
    return waitForRoundEnd().then(() => gameTie)
  }

  function waitFor(event) {
    return new Promise(resolve => game.on(event, resolve))
  }

  function waitForRoundEnd() {
    return new Promise(resolve => game.on('round.end', (player, board) => {
      resolve({ player, board })
    }))
  }

  function assertPlayerHasMoved(roundEnd, player, coords) {
    return roundEnd.then(args => {
      args.player.should.equal(player)
      args.board.getSignAt(coords).should.equal(player.getSign())
    })
  }
})
