'use strict'

const WinStatus = require('./WinStatus'),
  TieStatus = require('./TieStatus'),
  OngoingStatus = require('./OngoingStatus')

exports.from = analyzeBoard

function analyzeBoard(board) {
  const PotentialStatuses = [WinStatus, TieStatus, OngoingStatus]
  return PotentialStatuses
    .map(Status => Status.check(board))
    .reduce((current, next) => current.or(next))
}
