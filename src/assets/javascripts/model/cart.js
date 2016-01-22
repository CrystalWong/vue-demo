var Stapes = require('stapes')
var Dmall = require('../service/dmall.js')
var repository = require('../util/repository.js')
var CONSTANT = require('../util/constant.js')
var tool = require('../util/tool.js')
var dmall = new Dmall()
var dmall2 = new Dmall()
var respose = require('../service/dmallResponse.js')

var Cart = Stapes.subclass({
  constructor: function (obj) {

  },
  initcart: function () {

  },
  getCartInfo: function () {
    console.log(dmall === dmall2)
    console.log(dmall === dmall)
    let tempId = repository.getUserTempId()
    let lat = tool.getCookie(CONSTANT.LAT)
    let lng = tool.getCookie(CONSTANT.LNG)
    let header = dmall.getHeader()
    if (!header.storeId) {
      //4 test
      header['storeId'] = 150
      header['venderId'] = 1
      //end

      //header['storeId'] = tool.getCookie(CONSTANT.STOREID)
      //header['venderId'] = ttool.getCookie(CONSTANT.VENDORID)
    }
    dmall.post('cart/cartInfo', {lat: 39.904989, lng: 116.405285}).then(respose).then(
      function (rs) {
        console.log(rs)
        let cartId = rs.cartId
        if (!tool.isEmpty(cartId)) {
          repository.setUserTempId(cartId)
        }
        this.emit('loadcartsuccess', rs)
      }.bind(this)
    ).catch(function (err) {
      this.emit('loadcartfailure')
    }.bind(this))
  }
})
module.exports = Cart
