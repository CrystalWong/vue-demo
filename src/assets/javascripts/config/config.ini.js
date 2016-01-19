'use strict'

var envConfig = {
  test: {
    storesApi: 'http://one.test.dmall.com/stores/show/',
    apiUrl: 'http://localhost:3000/stores/show/',
  },

  pre: {
    storesApi: 'http://one.pre.dmall.com/stores/show/'
  },

  online: {
    storesApi: 'http://one.dmall.com/stores/show/'
  }
}

module.exports = envConfig
