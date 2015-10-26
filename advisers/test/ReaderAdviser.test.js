'use strict'

const wco = require('co').wrap
const sinon = require('sinon')

require('chai').use(require('sinon-chai')).should()

const ReaderAdviser = require('../src/ReaderAdviser')
const Board = require('../../core').Board
const ConfirmedMessenger = require('../../util').messengers.Confirmed
const ManualReader = require('./helpers/ManualReader')
const IdentityParser = require('./helpers/IdentityParser')

suite('advisers/reader', function() {
  this.timeout(10)

  const promptMessage = 'Choose a cell'
  let readerAdviser, messenger, board
  setup(() => {
    board = Board.prefilled.fromRow(['X'])
    messenger = ConfirmedMessenger()
    let manualReader = ManualReader(messenger, promptMessage)
    readerAdviser = ReaderAdviser(manualReader, IdentityParser())
  })

  const validCoords = [0, 1], outerCellCoords = [1, 5], filledCellCoords = [0, 0]
  test('it returns the coords if valid', wco(function*() {
    messenger.send(validCoords)
    let advisedCoords = yield readerAdviser(board)
    advisedCoords.should.equal(validCoords)
  }))

  test('it asks for input until the coords are valid', wco(function*() {
    let eventHandler = sinon.spy()
    readerAdviser(board).then(eventHandler)
    yield messenger.send(outerCellCoords)
    yield messenger.send(validCoords)
    return delay(() => eventHandler.should.have.been.calledWith(validCoords))
  }))

  test('it returns the prompt message after send', wco(function*() {
    readerAdviser(board)
    let receivedMessage = yield messenger.send(validCoords)
    receivedMessage.should.equal(promptMessage)
  }))

  test('it returns error messages after invalid inputs', wco(function*() {
    readerAdviser(board)
    yield messenger.send(outerCellCoords)
    let outOfBoardMessage = yield messenger.send(filledCellCoords)
    let filledCellMessage = yield messenger.send(validCoords)
    outOfBoardMessage.should.match(/outside/)
    filledCellMessage.should.match(/not.*empty/)
  }))

})

function delay(fn) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(fn())
    }, 0)
  })
}
