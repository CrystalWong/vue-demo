<template>
  <div v-for="ware in wares" class="uk-width-9-10 uk-list uk-list-line floor-1">
      <img :src="ware.wareImg" class="uk-responsive-height"/>
      <div style="float:right">
        <p>{{ware.wareName }}</p>
        <p style="color:red;font-size:28px;font-weight:bold">{{ware.warePrice}}</p>
        <p><a class="add color-orange">+</a></p>
      </div>
  </div>
</template>

<style>
  .floor-1{
      height:8em;
      border-bottom:1px solid grey;
  }
  .add{
    border-radius: 50%;
    border: 1px solid #dadada;
  }
</style>

<script>
    export default {
        props: ['wares']
    }
</script>
