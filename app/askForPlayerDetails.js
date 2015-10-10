'use strict'

const inquirer = require('inquirer')

module.exports = askForDetails

function askForDetails(defaultName) {
  return new Promise(resolve => {
    inquirer.prompt(playerQuestions(defaultName), details => {
      resolve(Object.assign({}, { name: defaultName }, details))
    })
  })
}

function playerQuestions(defaultName) {
  return [typeQuestion(), nameQuestion(defaultName)]
}

function typeQuestion() {
  return {
    type: 'list',
    name: 'type',
    message: `Choose player's type`,
    choices: ['Human', 'Computer']
  }
}

function nameQuestion(defaultName) {
  return {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
    'default': defaultName,
    when: it => it.type === 'Human'
  }
}
