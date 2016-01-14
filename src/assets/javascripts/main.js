import Vue from 'vue'
import VueResource from 'vue-resource'
import TopHeader from './../../components/TopHeader.vue'
import Banner from './../../components/Banner.vue'
import Promotion from './../../components/Promotion.vue'
import Floor1 from './../../components/Floor_type_1.vue'
import Cart from './../../components/Cart.vue'

/* eslint-disable no-new*/
Vue.use(VueResource)

new Vue({
  el: '#app',
  components: {
    TopHeader,
    Banner,
    Promotion,
    Floor1,
    Cart
  }
})
