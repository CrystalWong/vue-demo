<template>
  <div v-for="ware in wares" class="uk-width-9-10  uk-position-relative floor-1">
      <img :src="ware.wareImg" class="uk-responsive-height ware-img"/>
      <div class="uk-position-absolute wrap-ware">
        <p class="ware-title">{{ware.wareName }}</p>
        <p class="color-orange ware-price">￥{{ware.warePrice}}</p>
      </div>
       <div class="uk-float-right"><a class="add-icon color-orange" v-on:click="addCart(ware)"></a></div>
  </div>
</template>

<style>
  .floor-1{
      border-bottom:1px solid #d6d6d6;
      margin:0 auto;
      padding:5px 0;
      overflow: hidden;
  }
  .add-icon{
    display: block;
    background-image: url(../assets/images/add_cart@3x.png);
    background-size:25px 25px;
    width: 25px;
    height: 25px;
    margin-top: 28px;
  }
  .wrap-ware{
    top: 5px;
    margin-left: 85px;
    margin-right: 30px;
  }
  .ware-img{
    width:80px;
    height: 80px;
    margin-right: 5px;
  }
  .ware-title{
    height: 50px;
    display: table-cell;
    vertical-align: middle;
  }
  .ware-price{
    margin:5px 0;
  }
</style>

<script>
import CONSTANT from '../assets/javascripts/util/constant.js'
import Cart from '../assets/javascripts/model/cart.js'


export default {
  props: ['wares'],
  methods: {
    addCart: function (ware) {
      // sku, count, storeId, venderId
      let sku = ware.sku
      let count = 1
      let storeId = localStorage.getItem(CONSTANT.STOREID)
      let venderId = localStorage.getItem(CONSTANT.VENDORID)
      let cart = new Cart()
      cart.add2Cart(sku, count, storeId, venderId);

      cart.on('addsuccess',function(data){
        console.log('addsuccess')
        console.log(data);
        // _this.$set('cartData', data);
      })

    }
  }
}
</script>
