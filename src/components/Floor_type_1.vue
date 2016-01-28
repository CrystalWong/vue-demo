<template>
  <div v-for="ware in wares" class="uk-width-9-10  uk-position-relative floor-1">
      <img :src="ware.wareImg" class="uk-responsive-height ware-img"/>
      <div class="uk-position-absolute wrap-ware">
        <p class="ware-title">{{ware.wareName }}</p>
        <p class="color-orange ware-price">￥{{ware.warePrice}}</p>
      </div>
       <div class="uk-float-right"><a class="add-icon color-orange" v-on:click="addCart(ware, $event)"></a></div>
  </div>
  <!-- v-if="addWareDisplay" -->
 <!--  <div style="">
    <img src="http://img.dmall.com/20150725/292e1801-4949-4266-a724-4322a7051165_m640" style="width:40px;height:40px;">
  </div> -->

  <!-- v-if="addWareDisplay"   v-bind:class="{'fly2cart':addWareDisplay}" -->
 <!--  <div  v-bind:style="addSuccessStyle" style="transition: all 1s;" v-bind:class="{'fly2cart':addWareDisplay}">
    <img :src="addWareImg" style="width:40px;height:40px;">
  </div> -->
  <canvas id="canvas" v-bind:class="{ 'canvas-hide': canvasHide}">当前浏览器不支持canvas，请更换浏览器</canvas>
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
  #canvas{
    position: fixed;
    top: 0;
  }
  .canvas-hide{
    display: none;
  }
/*  .fly2cart{
    top: 100%!important;
    left: 95%!important;
    opacity: 0!important;
  }*/
</style>

<script>
import CONSTANT from '../assets/javascripts/util/constant.js'
import Cart from '../assets/javascripts/model/cart.js'


export default {
  props: ['wares'],
  data() {
    return {
      canvasHide: true,
      timer: {},
      canvas: '',
      ball: {},
      WINDOW_WIDTH:document.documentElement.clientWidth,
      WINDOW_HEIGHT:document.documentElement.clientHeight
    }
    // addWareImg: '',
    // addWareDisplay: false,
    // addSuccessStyle: {}
  },
  ready :function() {
    this.$set('canvas',  document.getElementById('canvas'))

  },
  methods: {
    addCart: function (ware, event) {
      console.log(event.clientY);//
      console.log(ware.wareImg);//商品图片
      // sku, count, storeId, venderId
      let sku = ware.sku
      let count = 1
      let storeId = localStorage.getItem(CONSTANT.STOREID)
      let venderId = localStorage.getItem(CONSTANT.VENDORID)
      let cart = new Cart()
      cart.add2Cart(sku, count, storeId, venderId);

      cart.on('addsuccess',function(data){
        console.log('addsuccess');
        console.log(data);
        var yValue = event.clientY - event.layerY;
        this.initCanvas(ware.wareImg,yValue);
        // _this.$set('cartData', data);

        // addWareDisplay
        // this.$set('addWareDisplay', true);
        // this.$set('iconShow', true);
        // setTimeout(function(){
        //   this.$set('addWareDisplay', false);
        // }.bind(this),1000);
      }.bind(this))


      // // debugger;
      // // var topValue = event.clientY;
      // var topValue = event.clientY - event.layerY;
      // // event.screenY - event.layerY;
      // // console.log(event);

      // console.log("topValue"+topValue);
      // var styleDate = {
      //   'position': 'fixed',
      //   'left': '5%',
      //   'top': topValue+'px',
      //   'width':'40px',
      //   'height':'40px',
      //   'opacity': 1
      // }
      // this.$set('addSuccessStyle',styleDate);

      // this.$set('addWareImg', ware.wareImg);

      // console.log(this.addWareImg)
      // addWareImg
      // addWareDisplay
    },
    initCanvas: function(imgSrc,originY){
      console.log("000000000000000");
      this.canvasHide = false;
      var context = this.canvas.getContext('2d');
      // console.log(this.canvas)


      // var WINDOW_WIDTH = document.documentElement.clientWidth;
      // var WINDOW_HEIGHT = document.documentElement.clientHeight;

      canvas.width = this.WINDOW_WIDTH;
      canvas.height = this.WINDOW_HEIGHT;

      // canvas.width = document.documentElement.clientWidth;
      // canvas.height = document.documentElement.clientHeight;

      // var originY = event.clientY - event.layerY;
      console.log("originY:"+originY);
      this.ball = {
        x: this.WINDOW_WIDTH * 0.05,
        y: originY,
        targetY: this.WINDOW_HEIGHT - 20,
        g: (this.WINDOW_HEIGHT - originY -20)/5000,
        vx: (this.WINDOW_WIDTH * 0.95 - 50)/100,
        vy: 0,
        img:new Image()
      }
      this.ball.img.src = imgSrc;

      console.log(this.ball);

      this.drawAddEffect(context);
       // this.drawAddEffect(context,WINDOW_WIDTH,WINDOW_HEIGHT,ball);
      this.timer = setInterval(function(){
        this.drawAddEffect(context);
      }.bind(this),10);
    },
    drawAddEffect: function(cxt){
      // debugger;
      if(this.ball.y > this.ball.targetY){
        clearInterval(this.timer);
        this.canvasHide = true;
      }

      cxt.clearRect(0,0,this.WINDOW_WIDTH,this.WINDOW_HEIGHT);
      cxt.save();
      cxt.beginPath();
      cxt.drawImage(this.ball.img,0,0,640,640,this.ball.x,this.ball.y,50,50);
      cxt.restore();

      // cxt.clearRect(0,0,this.WINDOW_WIDTH,this.WINDOW_HEIGHT);

      // cxt.beginPath();
      // cxt.arc( this.ball.x , this.ball.y , 10 , 0 , 2*Math.PI , true );
      // cxt.closePath();

      // cxt.fill();

      //update trace
      this.ball.x += this.ball.vx;
      this.ball.y += this.ball.vy;
      this.ball.vy += this.ball.g;
      console.log("距离:"+this.ball.y);
    }




  }
}
</script>
