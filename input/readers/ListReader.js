'use strict'

module.exports = ListReader

const inquirer = require('inquirer')

const resultAnswerName = 'result'

function ListReader(promptMessage, choices) {
  return function read() {
    return new Promise(resolve => {
      inquirer.prompt([makeQuestion()], answers => {
        resolve(answers[resultAnswerName])
      })
    })
  }

  function makeQuestion() {
    return {
      type: 'list',
      name: resultAnswerName,
      choices,
      message: promptMessage
    }
  }
}
