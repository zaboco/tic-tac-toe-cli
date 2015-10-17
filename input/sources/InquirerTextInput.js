'use strict'

const inquirer = require('inquirer')

const resultAnswerName = 'result'

module.exports = class InquirerTextInput {
  constructor(message) {
    this.message = message
  }

  readWith(parser) {
    return new Promise(resolve => {
      inquirer.prompt([this._makeQuestion(parser)], answers => {
        resolve(answers[resultAnswerName])
      })
    })
  }

  _makeQuestion(parser) {
    return {
      type: 'input',
      name: resultAnswerName,
      message: this.message,
      validate(inputString) {
        return parser.preValidate(inputString)
      },
      filter(inputString) {
        return parser.parse(inputString)
      }
    }
  }
}
