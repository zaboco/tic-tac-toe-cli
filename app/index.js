'use strict'

const inquirer = require('inquirer')

const questions = [
  {
    type: 'list',
    name: 'firstPlayerType',
    message: `Choose first player's type`,
    choices: ['Human', 'Computer']
  },
  {
    type: 'input',
    name: 'firstPlayerName',
    message: 'What is your name?',
    when(answers) {
      return answers.firstPlayerType === 'Human'
    }
  },
  {
    type: 'list',
    name: 'secondPlayerType',
    message: `Choose second player's type`,
    choices: ['Human', 'Computer']
  },
  {
    type: 'input',
    name: 'secondPlayerName',
    message: 'What is your name?',
    when(answers) {
      return answers.secondPlayerType === 'Human'
    }
  }
]

inquirer.prompt(questions, (answers) => {
  console.log(answers)
})
