'use strict'

const should = require('chai').should()
const wco = require('co').wrap

const HumanPlayer = require('../src/HumanPlayer')
const Board = require('../src/board')
const FakeUI = require('./fakes/FakeUI')

suite('HumanPlayer', () => {
  const playerSign = 'X'

  test('the sign is set', () => {
    let player = new HumanPlayer(playerSign)
    player.getSign().should.equal(playerSign)
  })

  suite('#findMoveFor', () => {
    let emptyBoard
    let player, fakeUI
    setup(() => {
      player = new HumanPlayer(playerSign)
      fakeUI = new FakeUI()
      emptyBoard = Board.empty()
    })

    test('initially', () => {
      fakeUI.getOutput().should.be.empty
      fakeUI.wasAskedToMove().should.be.false
    })

    suite('output', () => {
      test('is full table of flat cell indexes for empty board', wco(function*() {
        yield findMoveForBoard(Board.empty())
        assertUiPrints('1 2 3\n4 5 6\n7 8 9')
      }))

      test('has signs where it the board is not empty', wco(function*() {
        yield findMoveForBoard(Board.prefilled.fromRow(['X']))
        assertUiPrints('X 2 3\n4 5 6\n7 8 9')
      }))
    })

    suite('correct input', () => {
      const correctTestCases = [
        ['1', [0, 0]],
        ['3', [0, 2]],
        ['4', [1, 0]],
        ['9', [2, 2]]
      ]

      correctTestCases.forEach(testCase => {
        test(`for ${testCase[0]}`, wco(function*() {
          yield findMoveForBoard(emptyBoard)
          assertUiWouldReturnCoordsFor(testCase[0], testCase[1])
        }))
      })
    })

    suite('wrong input', () => {
      let boardWithTopLeftCell
      setup(() => {
        boardWithTopLeftCell = emptyBoard.fillCellAt([0, 0], 'X')
      })
      const errorTestCases = [
        ['', /cannot.*be.*empty/i],
        ['a', /must.*be.*number/i],
        ['0', /must.*be.*between.*1.*9/i],
        ['10', /must.*be.*between.*1.*9/i],
        ['1', /cell.*must.*be.*empty/i]
      ]

      errorTestCases.forEach(testCase => {
        test(`for ${testCase[0]}`, wco(function*() {
          yield findMoveForBoard(boardWithTopLeftCell)
          assertUiWouldReturnErrorFor(testCase[0], testCase[1])
        }))
      })
    })

    function findMoveForBoard(board) {
      return player.findMoveFor(board, fakeUI)
    }

    function assertUiWouldReturnCoordsFor(input, coords) {
      assertUiPrints(FakeUI.chooseCellMessage)
      fakeUI.wasAskedToMove().should.be.true
      fakeUI.returnedCoordsForInput(input).should.eql(coords)
      should.not.exist(fakeUI.returnedErrorForInput(input))
    }

    function assertUiWouldReturnErrorFor(input, errorRegex) {
      assertUiPrints(FakeUI.chooseCellMessage)
      fakeUI.wasAskedToMove().should.be.true
      fakeUI.returnedErrorForInput(input).should.match(errorRegex)
    }

    function assertUiPrints(output) {
      fakeUI.getOutput().should.include(output)
    }
  })
})

