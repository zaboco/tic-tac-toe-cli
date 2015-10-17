'use strict'

const PlayersProvider = require('./PlayersProvider'),
  Humans = require('./HumanPlayerGenerator'),
  Computers = require('./ComputerPlayersGenerator')

exports.Humans = Humans
exports.Computers = Computers

const input = require('../input')

exports.presets = {
  HumanOrComputer(computerAlgorithm) {
    let playerTypesMapping = {
      human: Humans(input.presets.CoordsFromHeaders()),
      computer: Computers(computerAlgorithm)
    }
    let playerInfoInput = new input.sources.PlayerInfo(['human', 'computer'], ['human'])
    return new PlayersProvider(playerTypesMapping, playerInfoInput)
  }
}
