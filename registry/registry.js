'use strict'

const deependr = require('deependr')

const implementations = require('./implementations')

let registry = deependr.container()
registry.$$ = deependr.components.factory.predefinedFrom(implementations)

module.exports = registry
