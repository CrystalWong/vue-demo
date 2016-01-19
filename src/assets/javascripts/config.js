'use strict'

var envConfig = {
  test: {
    serverAddress: 'http://localhost:3000/stores/show/'
  },

  pre: {
    serverAddress: 'http://one.pre.dmall.com/stores/show/'
  },

  online: {
    serverAddress: 'http://one.dmall.com/stores/show/'
  }
}

module.exports = envConfig
