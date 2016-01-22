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
    console.log('add2Cart')
    let tempId = repository.getUserTempId()
    let header = dmall.getHeader()
    let token = tool.getCookie('token')
    let erpStoreId = storeId || tool.getCookie(store_id)
    let vendorId = venderId || tool.getCookie('vendorId') || tool.getCookie('vender_id')
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
    console.log('updateCartItem')
    let tempId = repository.getUserTempId()
    let header = dmall.getHeader()
    let token = tool.getCookie('token')
    let erpStoreId = storeId || tool.getCookie(store_id)
    let vendorId = venderId || tool.getCookie('vendorId') || tool.getCookie('vender_id')
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
  getCartInfo: function () {
    console.log(dmall === dmall2)
    console.log(dmall === dmall)
    let tempId = repository.getUserTempId()
    let lat = tool.getCookie(CONSTANT.LAT)
    let lng = tool.getCookie(CONSTANT.LNG)
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

      //header['storeId'] = tool.getCookie(CONSTANT.STOREID)
      //header['venderId'] = ttool.getCookie(CONSTANT.VENDORID)
    }
    if(!header.token && !tool.isEmpty(token)) {
      header['token'] = token
    }
    if (!tool.isEmpty(tempId)) {
      params['tempId'] = tempId
    }
    dmall.post('cart/cartInfo', params).then(respose).then(
      function (rs) {
        console.log(rs)
        let cartId = rs.cartId
        if (!tool.isEmpty(cartId) && tool.isEmpty(tool.getCookie('token'))) {
          repository.setUserTempId(cartId)
        }
        if(!tool.isEmpty(tool.getCookie('token'))) {
          repository.deleteUserTempId()
        }
        this.emit('loadcartsuccess', rs)
      }.bind(this)
    ).catch(function (err) {
      this.emit('loadcartfailure')
    }.bind(this))
  }
})
module.exports = Cart
