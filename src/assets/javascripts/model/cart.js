var Stapes = require('stapes')
var Vue = require('vue')
Vue.use(require('vue-resource'))

var Cart = Stapes.subclass({
  constructor: function (obj) {

  },
  initcart: function () {

  },
  getCartInfo: function (tempId) {
    console.log('getCartInfo')
  }
})
module.exports = Cart
