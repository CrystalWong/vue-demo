<template>
  <div v-for="ware in wares" class="uk-width-1-1 floor-1">
      <img :src="ware.wareImg" class="uk-responsive-height" />
      <p>{{ware.wareName}}</p>
      <p>{{ware.warePrice}}</p>
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