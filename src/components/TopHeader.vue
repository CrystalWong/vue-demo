<template>
    <header class="uk-width-1-1 top-header">
        <h1 class="uk-container-center uk-text-center uk-width-1-2" v-text="hTitle"></h1>
    </header>
</template>
<style>
    .top-header{
        height: 3em;
        background: #ed724d;
    }
    .top-header h1{
        color: #ffffff;
        font-size: 1.5em;
    }
</style>
<script>
export default {
    props:['hTitle']
}
</script>