const { DID_METHOD, resolve } = require('./resolve')
const { registerMethod } = require('did-resolver')

function register() {
  registerMethod(DID_METHOD, onmethod)
}

function onmethod(did) {
  return resolve(did)
}

module.exports = {
  register
}
