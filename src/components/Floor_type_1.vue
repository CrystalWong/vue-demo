<template>
  <div v-for="ware in wares" class="uk-width-9-10  uk-position-relative floor-1">
      <img :src="ware.wareImg" class="uk-responsive-height ware-img"/>
      <div class="uk-position-absolute wrap-ware">
        <p class="ware-title">{{ware.wareName }}</p>
        <p class="color-orange ware-price">{{ware.warePrice/100 | currency '￥'}}</p>
      </div>
       <div class="uk-float-right"><a class="add-icon color-orange" v-on:click="addCart(ware, $event)"></a></div>
  </div>
  <div class="uk-text-center padding-tb-5">没有更多商品了</div>
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
  .padding-tb-5{
    padding-top: 5px;
    padding-bottom: 5px;
  }
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
  },
  ready :function() {
    this.$set('canvas',  document.getElementById('canvas'))

  },
  methods: {
    addCart: function (ware, event) {
      // console.log(event.clientY);//
      // console.log(ware.wareImg);//商品图片
      // sku, count, storeId, venderId
      let sku = ware.sku
      let count = 1
      let storeId = localStorage.getItem(CONSTANT.STOREID)
      let venderId = localStorage.getItem(CONSTANT.VENDORID)
      let cart = new Cart()
      cart.add2Cart(sku, count, storeId, venderId);

      cart.on('addsuccess',function(data){
        console.log('addsuccess')
        // console.log(UIkit)
        // UIkit.notify({
        //     message: '加入购物车成功',
        //     status: 'success',
        //     timeout: 2000,
        //     pos: 'bottom-center'
        // });

        // console.log(data);
        var yValue = event.clientY - event.layerY;
        this.initCanvas(ware.wareImg,yValue);
      }.bind(this))
    },
    initCanvas: function(imgSrc,originY){
      this.canvasHide = false;
      var context = this.canvas.getContext('2d');

      canvas.width = this.WINDOW_WIDTH;
      canvas.height = this.WINDOW_HEIGHT;

      // console.log("originY:"+originY);
      this.ball = {
        x: this.WINDOW_WIDTH * 0.05,
        y: originY,
        targetY: this.WINDOW_HEIGHT - 20,
        g: (this.WINDOW_HEIGHT - originY -20)/1250,
        vx: (this.WINDOW_WIDTH * 0.95 - 50)/50,
        vy: 0,
        img:new Image()
      }
      this.ball.img.src = imgSrc;

      // console.log(this.ball);

      this.drawAddEffect(context);
       // this.drawAddEffect(context,WINDOW_WIDTH,WINDOW_HEIGHT,ball);
      this.timer = setInterval(function(){
        this.drawAddEffect(context);
      }.bind(this),10);
    },
    drawAddEffect: function(cxt){
      if(this.ball.y > this.ball.targetY){
        clearInterval(this.timer);
        this.canvasHide = true;
      }

      cxt.clearRect(0,0,this.WINDOW_WIDTH,this.WINDOW_HEIGHT);
      cxt.save();
      cxt.beginPath();
      cxt.drawImage(this.ball.img,0,0,640,640,this.ball.x,this.ball.y,50,50);
      cxt.restore();

      //update trace
      this.ball.x += this.ball.vx;
      this.ball.y += this.ball.vy;
      this.ball.vy += this.ball.g;
      // console.log("距离:"+this.ball.y);
    }




  }
}
</script>
