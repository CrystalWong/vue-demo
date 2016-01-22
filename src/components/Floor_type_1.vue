<template>
  <div v-for="ware in wares" class="uk-width-9-10  uk-position-relative floor-1">
      <img :src="ware.wareImg" class="uk-responsive-height ware-img"/>
      <div class="uk-position-absolute wrap-ware">
        <p class="ware-title">{{ware.wareName }}</p>
        <p class="color-orange ware-price">￥{{ware.warePrice}}</p>
      </div>
       <div class="uk-float-right"><a class="add-icon color-orange" @click="showCart"></a></div>
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
    export default {
        props: ['wares'],
        methods: {
          showCart: function (args) {
            console.log("addddddd")
            this.$dispatch('changeCartDisplay')
          }
        }
    }
</script>
