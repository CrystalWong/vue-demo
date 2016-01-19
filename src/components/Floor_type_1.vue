<template>
  <div v-for="ware in wares" class="uk-width-1-1 floor-1">
      <img :src="ware.wareImg" class="uk-responsive-height"/>
      <div style="float:right">
        <p>{{ware.wareName }}</p>
        <p style="color:red;font-size:28px;font-weight:bold">{{ware.warePrice}}</p>
        <p><a>立即购买</a></p>
      </div>
  </div>  
</template>

<style>
  .floor-1{
      height:8em;
      border-bottom:1px solid grey;
  }
</style>

<script>
    export default {
        props: ['wares']
    }
</script>