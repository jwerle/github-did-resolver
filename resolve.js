const { DIDDocument } = require('did-document')
const cryptosuite = require('ld-cryptosuite-registry')
const { DID } = require('did-uri')
const fetch = require('node-fetch')
const sshpk = require('sshpk')
const url = require('url')

const GITHUB_HOST = 'https://github.com'
const DID_METHOD = 'github'
const DID_PREFIX = `did:${DID_METHOD}:`

async function resolve(uri, opts) {
  if (!opts || 'object' !== typeof opts) {
    opts = {}
  }

  if (!uri || 'string' !== typeof uri) {
    throw new TypeError('Expecting URI to be a string.')
  }

  if (false === RegExp(`^${DID_PREFIX}.*$`).test(uri)) {
    uri = `${DID_PREFIX}${uri}`
  }

  const { host = GITHUB_HOST } = opts
  const did = new DID(uri)

  if (DID_METHOD !== did.method) {
    throw new TypeError('Expecting DID method to be \'github\'.')
  }

  const { identifier } = did
  const res = await fetch(url.resolve(GITHUB_HOST, identifier + '.keys'), {
    mode: 'cors'
  })

  if (200 !== res.status) {
    throw new Error(res.statusText)
  }

  const ddo = new DIDDocument({ id: did.did })
  const body = await res.text()
  const buffers = body.split('\n').filter(Boolean).map((t) => Buffer.from(t))
  const publicKeys = buffers.map((buffer) => sshpk.parseKey(buffer, 'ssh'))

  for (let i = 0; i < publicKeys.length; ++i) {
    addPublicKey(i, publicKeys[i])
    addAuthentication(i, publicKeys[i])
  }

  return JSON.parse(JSON.stringify(ddo))

  function addPublicKey(i, publicKey) {
    const publicKeyPem = publicKey.toString('pem')
    const owner = did.did
    const id = `${owner}#key-${i}`
    let type = null

    switch (publicKey.type) {
      case 'rsa':
        type = cryptosuite.RsaVerificationKey2018
        break

      case 'ed25519':
        type = cryptosuite.Ed25519VerificationKey2018
        break
    }

    if (type) {
      ddo.addPublicKey({ publicKeyPem, owner, type, id })
    }
  }

  function addAuthentication(i, publicKey) {
    const owner = did.did
    const id = `${owner}#key-${i}`
    let type = null

    switch (publicKey.type) {
      case 'rsa':
        type = cryptosuite.RsaSignature2018
        break

      case 'ed25519':
        type = cryptosuite.Ed25519SignatureAuthentication2018
        break
    }

    if (type) {
      ddo.addAuthentication({ type, publicKey: id })
    }
  }
}

module.exports = {
  GITHUB_HOST,
  DID_PREFIX,
  DID_METHOD,
  resolve,
}
