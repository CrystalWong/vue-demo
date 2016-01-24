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
  /*
   add2Cart: function() {
   console.log('jsonP add2Cart')
   jsonP.jsonp('mcart/add.jsonp', {skuId: 191289, erpStoreId: 230}).then(respose).then(
   function (rs) {
   this.emit('addsuccess', rs)
   }.bind(this)
   ).catch(function (err) {
   this.emit('addfailure')
   }.bind(this))
   },
   */
  add2Cart: function(sku, count, storeId, venderId) {
    let tempId = repository.getUserTempId()
    let header = dmall.getHeader()
    let token = tool.getCookie('token')
    let erpStoreId = storeId || repository.getStoreId()
    let vendorId = venderId || repository.getVendorId() || tool.getCookie('vendorId') || tool.getCookie('vender_id')
    let params = {
      storeGroup: [{"erpStoreId": erpStoreId, "wares": [{"sku": sku, "count": count || 1, "checked": true}]}]
    }
    if(!tool.isEmpty(storeId)) {
      header['storeId'] = storeId
    }
    if(!tool.isEmpty(vendorId)) {
      header['venderId'] = venderId
    }
    if(!tool.isEmpty(token)) {
      header['token'] = token
    }
    if (!tool.isEmpty(tempId)) {
      params['tempId'] = tempId
    }
    dmall.post('cart/addToCart', params).then(respose).then(
      function (rs) {
        if(tool.isEmpty(tool.getCookie('token')) && !tool.isEmpty(rs.cartId)) {
          repository.setUserTempId(rs.cartId)
        }
        this.emit('addsuccess', rs)
      }.bind(this)
    ).catch(function (err) {
      this.emit('addfailure')
    }.bind(this))
  },
  updateCartItem: function(sku, count, storeId, venderId) {
    if(!count) {
      return
    }
    let tempId = repository.getUserTempId()
    let header = dmall.getHeader()
    let token = tool.getCookie('token')
    let erpStoreId = storeId || repository.getStoreId()
    let vendorId = venderId || repository.getVendorId() || tool.getCookie('vendorId') || tool.getCookie('vender_id')
    let params = {
      storeGroup: [{"erpStoreId": erpStoreId, "wares": [{"sku": sku, "count": count || 1, "checked": true}]}]
    }
    if(!tool.isEmpty(storeId)) {
      header['storeId'] = storeId
    }
    if(!tool.isEmpty(vendorId)) {
      header['venderId'] = venderId
    }
    if(!tool.isEmpty(token)) {
      header['token'] = token
    }
    if (!tool.isEmpty(tempId)) {
      params['tempId'] = tempId
    }
    dmall.post('cart/updateCartItem', params).then(respose).then(
      function (rs) {
        if(tool.isEmpty(tool.getCookie('token')) && !tool.isEmpty(rs.cartId)) {
          repository.setUserTempId(rs.cartId)
        }
        this.emit('updatesuccess', rs)
      }.bind(this)
    ).catch(function (err) {
      this.emit('updatefailure')
    }.bind(this))
  },
  getCartInfo: function (storeId, vendorId) {
    let tempId = repository.getUserTempId()
    let lat = repository.getLatLng().lat
    let lng = repository.getLatLng().lng
    let header = dmall.getHeader()
    let token = tool.getCookie('token')
    let params = {
      //4 test
      lat: 39.904989,
      lng: 116.405285
      //end
      //lat: lat,
      //lng: lng
    }
    if (!header.storeId) {
      //4 test
      header['storeId'] = 150
      header['venderId'] = 1
      //end

      //header['storeId'] = storeId || repository.getStoreId(CONSTANT.STOREID)
      //header['venderId'] = vendorId || repository.getVendorId(CONSTANT.VENDORID)
    }
    if(!header.token && !tool.isEmpty(token)) {
      header['token'] = token
    }
    if (!tool.isEmpty(tempId)) {
      params['tempId'] = tempId
    }
    dmall.post('cart/cartInfo', params).then(respose).then(
      function (rs) {
        let cartId = rs.cartId
        if (!tool.isEmpty(cartId) && tool.isEmpty(tool.getCookie('token'))) {
          repository.setUserTempId(cartId)
        }
        if(!tool.isEmpty(tool.getCookie('token'))) {
          repository.deleteUserTempId()
        }
        this.emit('loadcartsuccess', this.extractCurrentCart(rs, 150))
      }.bind(this)
    ).catch(function (err) {
      this.emit('loadcartfailure')
    }.bind(this))
  },
  extractCurrentCart: function(rs, storeId) {
    let currentCart = tool.clone(rs)
    let erpStoreId = storeId || repository.getStoreId()
    let O = Stapes.subclass()
    let o = new O()
    o.push(rs.storeGroup || [])
    currentCart.storeGroup = []
    o.each(function(cart) {
      if(String(erpStoreId) === String(cart.erpStoreId)) {
        currentCart.storeGroup.push(cart)
      }
    })
    return currentCart
  }
})
module.exports = Cart
