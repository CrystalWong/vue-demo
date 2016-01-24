<template>
  <!-- <div id="one-piece_cart" > -->
     <!-- style="display:none;" -->
    <div v-bind:class="{ 'cart-show': cartShow, 'cart-hide': cartHide}" v-if="cart_display" style="position: fixed;width: 100%;height: 100%;top: 0;">
      <div class="mask uk-height-1-1"></div>

      <div class="uk-position-bottom uk-width-1-1 bg-white wrap-cart-list cart-effect">
        <div class="cart-icon cart-list-icon-position margin-top-reverse-25" v-on:click="switchCartStatus"></div>
        <!-- <img src="../assets/images/cart_empty.png"> -->
        <div v-for="cart in cartData.storeGroup">
          <div v-for="typeGroup in cart.typeGroup">
            <ul v-for="promotionGroup in typeGroup.promotionGroup" class="cart-list uk-list uk-list-line uk-width-9-10">
              <li v-for="ware in promotionGroup.wares" class="ware-item-padding">
                <span class="uk-display-inline-block uk-width-1-2 uk-text-truncate">{{ ware.name }}</span>
                <span class="uk-display-inline-block color-orange uk-text-top">{{ ware.promotionPrice/100 | currency '￥'}}</span>
                <div class="uk-float-right">
                  <span v-if="1 == ware.count" class="ware-del small-icon-size uk-text-middle" v-on:click="trashWare(ware, cart, $event)"></span>
                  <span v-if="ware.count > 1" class="ware-reduce small-icon-size uk-text-middle" v-on:click="reduceWare(ware, cart, $event)"></span>
                  <span class="ware-count">{{ ware.count }}</span>
                  <span class="ware-add small-icon-size uk-text-middle" v-on:click="addWare(ware, cart, $event)"></span>
                </div>
              </li>
            </ul>
            <div class="uk-grid">
              <div class="bg-grey uk-width-8-10 uk-text-right wrap-check">
                <p class="uk-margin-remove color-orange uk-text-bold uk-text-large">{{ typeGroup.bizTypeDiscountPrice/100 | currency '￥'}}</p>
                <p class="uk-margin-remove color-grey">总额: {{ typeGroup.bizTypeOriginalPrice/100 | currency '￥' }}  优惠: {{ typeGroup.bizTypeDiscountAmount/100 | currency '￥' }}</p>
              </div>
              <a class="bg-orange color-white uk-width-2-10 uk-text-center uk-text-large btn-check" v-on:click="goCheckout()">结算</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-icon cart-icon-size position-fixed" style="bottom: 20px;right: 0;" v-else="cart_display" v-on:click="switchCartStatus"></div>
  <!-- </div> -->
</template>
<style>
  .cart-icon{
    background-image: url(../assets/images/cart.png);
  }
  .cart-icon-size{
    background-size:50px 50px;
    width: 50px;
    height: 50px;
  }
  .cart-list-icon-position{
    background-size: 50px 50px;
    height: 50px;
    background-position-x: right;
    background-repeat: no-repeat;
  }
  .wrap-cart-list{
/*    top: 100%;
    margin-top: -120px;*/
  }
  .cart-list{
    margin:0 auto;
    max-height: 200px;
    overflow-y: scroll;
  }
  .ware-count{
    display: inline-block;
    width: 20px;
    text-align: center;
  }
  .wrap-check{
    padding:5px 25px 5px 0;
  }
  .btn-check{
    line-height: 55px;
    padding-left: 0;
  }
  .ware-item-padding{
    padding: 8px 0;
  }
  .cart-list.uk-list-line>li:nth-child(n+2){
    margin-top: 0;
    padding: 8px 0;
  }
  .ware-del{
    background-image: url(../assets/images/delete_cart.png);
  }
  .ware-reduce{
    background-image: url(../assets/images/reudce_cart.png);
  }
  .ware-add{
     background-image: url(../assets/images/add_cart@3x.png);
  }
  .small-icon-size{
    display: inline-block;
    background-size:20px 20px;
    width: 20px;
    height: 20px;
  }
  .mask{
    position: absolute;
    background: rgba(0,0,0,.5);
    width: 100%;
    /*height: 100%;*/
    top: 0;
  }
  .cart-show .cart-effect{
    animation: upShow linear .5s both;
    -webkit-animation: upShow linear .5s both;
  }
  .cart-hide .cart-effect{
   animation: downHide linear .5s both;
   -webkit-animation: downHide linear .5s both;
  }

  @keyframes upShow{
    0%{opacity:0;-webkit-transform:translateY(100%)}100%{opacity:1;-webkit-transform:translateY(0)}
  }
  @keyframes downHide{
    0%{opacity:1;-webkit-transform:translateY(0)}100%{opacity:0;-webkit-transform:translateY(100%)}
  }/*  .upShow{

  }
  @keyframes upShow{
    0%{opacity:0;-webkit-transform:translateY(100%)}100%{opacity:1;-webkit-transform:translateY(0)}
  }*/

</style>
<script>
// import redirectServer from '../assets/javascripts/config/config.js'
import Cart from '../assets/javascripts/model/cart.js'
import CONSTANT from '../assets/javascripts/util/constant.js'

// let cartData;

// var cart = new Cart
// cart.getCartInfo()
// cart.on('loadcartsuccess', function(data){
//   cartData = data
// })
class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
let poly = new Polygon(2,3)
export default {
  data() {
    return {
      cart_display: false,
      cartData: {
        storeGroup: []
      },
      cartModel: {}
    }
  },
  ready :function(){
    let _this = this
    let cart = new Cart()

    this.$set('cartModel', cart)
    cart.getCartInfo()
    cart.on('loadcartsuccess', function (data) {
      _this.$set('cartData', data)
    })
    cart.on('updatesuccess', function (data) {
      this.$set('cartData', data)
    }.bind(this))
    cart.on('removesuccess', function (data) {
      this.$set('cartData', data)
    }.bind(this))
  },
  methods: {
    addWare: function (ware, cart, event) {
      this.cartModel.updateCartItem(ware.sku, ware.count + 1, cart.erpStoreId)
    },
    reduceWare: function (ware, cart, event) {
      this.cartModel.updateCartItem(ware.sku, ware.count - 1, cart.erpStoreId)
    },
    trashWare: function (ware, cart, event) {
      this.cartModel.removeCartItem(ware.sku, cart.erpStoreId)
    },
    switchCartStatus: function() {
      this.cartModel.getCartInfo()
      if (this.cart_display == true){
        setTimeout(function(){
          this.$set('cart_display', false);
        }.bind(this),500);
        this.$set('cartHide', true);
        this.$set('cartShow', false);
        this.$dispatch('showOverflow')
      }else{
        this.$set('cart_display', true);
        this.$set('cartHide', false);
        this.$set('cartShow', true);
        this.$dispatch('hideOverflow')
      }
      // this.$set('cart_display', !this.cart_display)
      this.$dispatch('cartSatus', this.cart_display)
    },
    goCheckout: function(){
      let groupType = 1
      let fromOnePiece = true
      let erpStoreId = localStorage.getItem(CONSTANT.STOREID)
      let venderId = localStorage.getItem(CONSTANT.VENDORID)
      let lat = localStorage.getItem(CONSTANT.LAT)
      let lng = localStorage.getItem(CONSTANT.LNG)
      let areadId = localStorage.getItem(CONSTANT.AREADID)
      let communityName = localStorage.getItem(CONSTANT.COMMUNITYNAME)

      //&fromOnePiece=true&consigneeName=武松&mobilPhone=18712341234&areadId=100011&communityName=警察局&lat=39.904989&lng=116.405285
      // let url = "http://bjm.test.dmall.com:8003/checkout.html?storeId="+erpStoreId+"&vendorId="+venderId+"&salesType="+groupType+"&fromOnePiece="+fromOnePiece+"&lat="+lat+"&lng="+lng+"&areadId="+areadId+"&communityName="+communityName;
      // console.log(url)
      window.location.href = "http://m.pre.dmall.com/checkout.html?storeId="+erpStoreId+"&vendorId="+venderId+"&salesType="+groupType+"&fromOnePiece="+fromOnePiece+"&lat="+lat+"&lng="+lng+"&areadId="+areadId+"&communityName="+communityName;
    }
  }
}
</script>

