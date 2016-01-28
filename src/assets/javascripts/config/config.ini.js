'use strict'

var envConfig = {
  test: {
    storesApi: 'http://one.test.dmall.com/stores/show/',
    locationCheckout: 'http://bjm.test.dmall.com:8003/checkout.html',
    locationLogin: 'http://bjm.test.dmall.com:8003/login.html'
  },

  pre: {
    storesApi: 'http://one.pre.dmall.com/stores/show/',
    locationCheckout: 'http://m.pre.dmall.com/checkout.html',
    locationLogin: 'http://m.pre.dmall.com/login.html'
  },

  online: {
    storesApi: 'http://one.dmall.com/stores/show/',
    locationCheckout: 'http://m.dmall.com/checkout.html',
    locationLogin: 'http://m.pre.dmall.com/login.html'
  }
}

module.exports = envConfig
