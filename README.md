github-did-resolver
===================

A DID resolver for Github identities

## Installation

```sh
$ npm install github-did-resolver
```

## Usage

```js
const { resolve } = require('github-did-resolver')
resolve('did:github:jwerle').then(console.log)
```

Register the resolver with
[did-resolver](https://github.com/uport-project/did-resolver):

```js
const { register } require('github-did-resolver')
const resolve = require('did-resolver')
register()
resolve('did:github:jwerle').then(console.log)
```

## API

### `const resolver = require('github-did-resolver')`

#### `resolver.resolve(uri[, opts])`

Resolve a Github identity into a DID document object where `uri` is either
in the form of `did:github:USERNAME` or `USERNAME`.

```js
resolve('did:github:mafintosh').then(console.log)
```

#### `resolver.register()`

Register resolver with
[did-resolver](https://github.com/uport-project/did-resolver) so you can
resolve `did:github:` identities with the `resolve()` function from
that module.

## Example

```js
const { resolve } = require('github-did-resolver')

resolve('did:github:jwerle').then(console.log)
```

Which outputs

```
{ '@context': 'https://w3id.org/did/v1',
  id: 'did:github:jwerle',
  publicKey:
   [ { id: 'did:github:jwerle#key-0',
       type: 'RsaVerificationKey2018',
       owner: 'did:github:jwerle',
       controller: 'did:github:jwerle',
       publicKeyPem:
        '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz8JtarQGuDUbiym0OBd5\nu9BYJ9qy7kE5ZFhU5ShtcGTbq6PlvvqSXnlafKP4GDcOC7GnBWgCx62ONbArqHFl\nTMcnicwjfVFoluMj22CtZ6Xc2JSKYK5gDdc/+KJ4JljkbPE5OKvMPgDvaOXRmwnC\n8tU/qooO2SwW9Q9WvHRdc1vZJAqJ9LWjdt82t1G+ikTKlWrMgbzpRKDpdQSQ/+wD\nyjXORtIGwAlSo/xRPl6qOfFUsSvNCo820/xxMLRHYp6sQ8SFXEwKfnLZi6rPLBfd\nKfFVyakEpOZ8EKAwspplayqHBlL1UL1TUyHhf2/5+NuZG2SgeWCzM4sWQNGWx2qE\nxwIDAQAB\n-----END PUBLIC KEY-----\n' },
     { id: 'did:github:jwerle#key-1',
       type: 'RsaVerificationKey2018',
       owner: 'did:github:jwerle',
       controller: 'did:github:jwerle',
       publicKeyPem:
        '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAknLJNOGzXytGdjvdvu4K\n5BnqcQ2TTkh1EHa+51y3jHmY8ILpPCnrgTtKa2hby7kdQO03COYUSD9bIyyTYr5l\nKOfOZ6t/vqFPgYw1LTfNBVcztoNxm1I1d4M3StVMlSzmYydAd+olzAzXTdlHNYiz\npVaJE7PF296KAqT4ukuJRcd2oDAha3S8jMFArWbvJzHba8m4I1mu+ferc+8J38hF\nkTzFQ59oYfF8YWrIOsUCS/cgb7adQQ4ggFlJx9ghDkajXxD2aF8rk9FHIkW4unpp\nWzvMi3rqACyaUw7M+qgZwTOwHoiPZT6lyjfsZiozUXwxsNIsNpgCnWOfd9GLZCm7\nGQIDAQAB\n-----END PUBLIC KEY-----\n' },
     { id: 'did:github:jwerle#key-2',
       type: 'RsaVerificationKey2018',
       owner: 'did:github:jwerle',
       controller: 'did:github:jwerle',
       publicKeyPem:
        '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0ZcDORc+LEb3mycc3YDv\npBv9pWzxbEsNwJSSl/Hc1YekS9NDGkJ3g15LzBpOLliu7e3nd8eOU+hCrJwHfLIW\npYWPw8Op3bv7WzJv63zny6Px2RecKmpomOlzVOkKGp1h6HMCzjVzsR+Y99t3MC4E\niX07paImVujGdoaeu74iLWmTVSrnSUlQvmZ+yn6AbxZzG0PNZRYgbCOtVIGjkyul\nbYh4qp3KZbY2jPeXv9M9107Vax/V01tfD3gq3RuE59f4J8bdjnRd0gHElFkdhYKY\np1pbIcXKZULsrMXT9K98yCXHr8R/kBzvM3ZzDhsAfOXItWjAigsXjJ+umhNqM76Z\n7wIDAQAB\n-----END PUBLIC KEY-----\n' },
     { id: 'did:github:jwerle#key-3',
       type: 'Ed25519VerificationKey2018',
       owner: 'did:github:jwerle',
       controller: 'did:github:jwerle',
       publicKeyPem:
        '-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEAZqZjtxUV88X+4KJUlTwxLjGgZmIeeqlORPCOdi2+pwE=\n-----END PUBLIC KEY-----\n' } ],
  authentication:
   [ { publicKey: 'did:github:jwerle#key-0',
       type: 'RsaSignature2018' },
     { publicKey: 'did:github:jwerle#key-1',
       type: 'RsaSignature2018' },
     { publicKey: 'did:github:jwerle#key-2',
       type: 'RsaSignature2018' },
     { publicKey: 'did:github:jwerle#key-3',
       type: 'Ed25519SignatureAuthentication2018' } ],
  service: [],
  created: '2019-05-08T20:15:33.222Z',
  updated: '2019-05-08T20:15:33.222Z',

```

## License

MIT
