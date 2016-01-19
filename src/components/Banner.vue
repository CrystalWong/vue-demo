<template>
 <div>
 <!-- style="max-width:465px" -->
  <div class="position-a uk-width-1-1 uk-text-center top-4">大山子酒店</div>
  <div>
  	<img :src="imageurl">
  </div>
 </div>
</template>
<style>
  .top-4{
    top:4rem;
  }
</style>
<script>
export default {
    props:['imageurl']
}
</script>
