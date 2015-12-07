'use strict'

const wrapClass = require('async-class').wrap

class GameController {
  constructor(gameMaker, playerMaker, gameUi) {
    this.gameMaker = gameMaker
    this.playerMaker = playerMaker
    this.gameUi = gameUi
  }

  *runGame() {
    let firstPlayer = yield this.playerMaker('X')
    let secondPlayer = yield this.playerMaker('O')
    let game = yield this.gameMaker([firstPlayer, secondPlayer])
    this.gameUi.showBoard(game.getBoard())
  }
}

module.exports = wrapClass(GameController)
