'use strict'

module.exports = TextReader

const inquirer = require('inquirer')

const resultAnswerName = 'result'

function TextReader(promptMessage) {
  return function read(parser, validator) {
    return new Promise(resolve => {
      inquirer.prompt([makeQuestion(parser, validator)], answers => {
        resolve(answers[resultAnswerName])
      })
    })
  }

  function makeQuestion(parser, validator) {
    parser = parser || (it => it)
    validator = validator || (() => true)
    return {
      type: 'input',
      name: resultAnswerName,
      message: promptMessage,
      validate: validator,
      filter: parser
    }
  }
}
