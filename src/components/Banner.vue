<template>
 <div>
 <!-- style="max-width:465px" -->
  <div class="uk-position-absolute uk-width-1-2 uk-text-center top-10 address">大山子酒店</div>
  <div>
  	<img :src="imageurl">
  </div>
 </div>
</template>
<style>
  .top-10{
    top:10px;
  }
  .address{
    background: rgba(255,255,255,.7);
    border-radius: 20px;
    left: 25%;
  }
</style>
<script>
export default {
    props:['imageurl']
}
</script>
