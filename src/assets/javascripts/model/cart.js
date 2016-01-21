var Stapes = require('stapes')
var Dmall = require('../service/dmall.js')
var dmall = new Dmall()
var dmall2 = new Dmall()

var Cart = Stapes.subclass({
  constructor: function (obj) {

  },
  initcart: function () {

  },
  getCartInfo: function (tempId) {
    console.log(dmall === dmall2)
    console.log(dmall === dmall)
    console.log('getCartInfo')
    dmall.get('app/aap')
  }
})
module.exports = Cart
