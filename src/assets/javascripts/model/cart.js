var Stapes = require('stapes')
var Dmall = require('../service/dmall.js')
var dmall = new Dmall()
var dmall2 = new Dmall()
var respose = require('../service/dmallResponse.js')

var Cart = Stapes.subclass({
  constructor: function (obj) {

  },
  initcart: function () {

  },
  getCartInfo: function (tempId) {
    console.log(dmall === dmall2)
    console.log(dmall === dmall)
    dmall.post('store/city/list').then(respose)
  }
})
module.exports = Cart
