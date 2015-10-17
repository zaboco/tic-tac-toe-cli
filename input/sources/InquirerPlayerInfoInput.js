'use strict'

const inquirer = require('inquirer'),
  _ = require('lodash')

module.exports = class InquirerPlayerInfoInput {
  constructor(allTypes, typesRequiringName) {
    this.types = allTypes
    this.typesRequiringName = typesRequiringName
  }

  read() {
    return new Promise(resolve => {
      inquirer.prompt(this._makeBothQuestions(), answers => {
        resolve(answers)
      })
    })
  }

  _makeBothQuestions() {
    return [
      this._makeTypeQuestion(),
      this._makeNameQuestion()
    ]
  }

  _makeTypeQuestion() {
    return {
      type: 'list',
      name: 'type',
      message: `Choose player's type`,
      choices: this.types
    }
  }

  _makeNameQuestion() {
    return {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      when: answers => this._shouldTypeRequireName(answers.type)
    }
  }

  _shouldTypeRequireName(type) {
    return _.contains(this.typesRequiringName, type)
  }
}
