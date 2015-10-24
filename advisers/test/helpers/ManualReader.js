'use strict'

module.exports = ManualReader

function ManualReader(messenger, initialMessage) {
  return function read(parser, validator) {
    let input = validateInputWith(validator, initialMessage)
    return parser(input)
  }

  function validateInputWith(validator, message) {
    return messenger.wait(message).then(input => {
      let validity = validator(input)
      if (validity === true) {
        return input
      } else {
        return validateInputWith(validator, validity)
      }
    })
  }
}
