<template>
  <!-- <div id="one-piece_cart" > -->
     <!-- style="display:none;" -->
    <div class="uk-animation-reverse" v-show="cart_display">
      <div class="mask uk-height-1-1"></div>

      <div class="uk-position-bottom uk-width-1-1 bg-white wrap-cart-list" v-on:click="clickCart">
        <div class="cart-icon cart-list-icon-position margin-top-reverse-25"></div>
        <!-- <img src="../assets/images/cart_empty.png"> -->
        <ul class="cart-list uk-list uk-list-line uk-width-9-10">
          <li class="ware-item-padding">
            <span class="uk-display-inline-block uk-width-1-2 uk-text-truncate">中绿生态蒜苗</span>
            <span class="uk-display-inline-block color-orange uk-text-top">￥11.00</span>
            <div class="uk-float-right">
              <a class="ware-del small-icon-size uk-text-middle" href=""></a>
              <!-- uk-margin-small-left uk-margin-small-right -->
              <span class="ware-count">00</span>
              <a class="ware-add small-icon-size uk-text-middle" href=""></a>
            </div>
          </li>

          <li class="ware-item-padding">
            <span class="uk-display-inline-block uk-width-1-2 uk-text-truncate">中绿生态蒜苗</span>
            <span class="uk-display-inline-block color-orange uk-text-top">￥11.00</span>
            <div class="uk-float-right">
              <a class="ware-del small-icon-size uk-text-middle" href=""></a>
              <span class="ware-count">00</span>
              <a class="ware-add small-icon-size uk-text-middle" href=""></a>
            </div>
          </li>

        </ul>
        <div class="uk-grid">
          <div class="bg-grey uk-width-8-10 uk-text-right wrap-check">
            <p class="uk-margin-remove color-orange uk-text-bold uk-text-large">￥11.00</p>
            <p class="uk-margin-remove color-grey">另需配送费7元</p>
          </div>
          <a class="bg-orange color-white uk-width-2-10 uk-text-center uk-text-large btn-check" href="" >结算</a>
        </div>
      </div>
    </div>
    <div class="cart-icon cart-icon-size position-fixed" style="bottom: 20px;right: 0;" data-value="cart_display" v-else="cart_display" @click="showCart"></div>
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
/*  .upShow{

  }
  @keyframes upShow{
    0%{opacity:0;-webkit-transform:translateY(100%)}100%{opacity:1;-webkit-transform:translateY(0)}
  }*/

</style>
<script>
import redirectServer from '../assets/javascripts/config/config.js'
import Cart from '../assets/javascripts/model/cart.js'
console.log(redirectServer)
console.log(Cart)

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
 console.log(poly.height);
export default {
  el: '#one-piece_cart',
  data() {
    return {
      cart_display: true,
      cartData: {
      }
    }
  },
  methods: {
    clickCart: function () {
      console.log('clickCart');
    }
  },
  ready :function(){
    let _this = this;
    let cart = new Cart()
    cart.getCartInfo();
    console.log(_this);
    cart.on('loadcartsuccess',function(data){
      console.log(data);
      _this.$set('cartData', data);
      console.log(_this.cartData);
      console.log(_this.cart_display);
    })
  },
  methods: {
    showCart: function () {
      this.$dispatch('displayCart')
    },
    hideCart: function (){
      this.$dispatch('hideCart')
      // this.$dispatch('changeCartDisplay')
    }
  }
}
</script>

