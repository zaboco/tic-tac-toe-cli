'use strict'

const co = require('co')

module.exports = class PlayersProvider {
  constructor(typesMap, playerInfoInput) {
    this.typesMap = typesMap
    this.playersInfoInput = playerInfoInput
  }

  provideOne(sign) {
    return this.playersInfoInput.read().then(playerInfo => {
      let PlayerType = this.typesMap[playerInfo.type]
      return new PlayerType(sign, playerInfo.name)
    })
  }

  provideForEach(firstSign, secondSign) {
    return co(function*() {
      let firstPlayer = yield this.provideOne(firstSign)
      let secondPlayer = yield this.provideOne(secondSign)
      return [firstPlayer, secondPlayer]
    }.bind(this))
  }
}
