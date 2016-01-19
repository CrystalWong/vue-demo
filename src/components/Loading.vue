<template>
 <div class="loading">
    <img src="./../assets/images/loading_prt_circle@3x.png" class="rotate circle_pos">
    <img src="./../assets/images/loading_prt_logo@3x.png"  class="logo_pos">
 </div>
</template>
<style type="text/css">
.loading{
  width: 100%;
  height: 100%;
  background:#f5f5f5;
  /*background-color:rgba(255,255,255,0.15)*/
}
.rotate{
    animation: whirl linear 1s infinite;
    -webkit-animation: whirl linear 1s infinite;
  }
  @keyframes whirl{
    0%{
      transform:rotate(0deg);
    }
    100%{
      transform:rotate(360deg);
    }
  }
  @-webkit-keyframes whirl{
    0%{
      -webkit-transform:rotate(0deg);
    }
    100%{
      -webkit-transform:rotate(360deg);
    }
  }
.circle_pos{
  position:absolute;
  left:50%;
  top:50%;
  margin-left:-80px;
  margin-top:-80px;
  z-index: 20
}

.logo_pos{
  position:absolute;
  left:50%;
  top:50%;
  margin-left:-80px;
  margin-top:-80px;

}

</style>
<script>
</script>
