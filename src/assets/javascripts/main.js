import Vue from 'vue'
import VueResource from 'vue-resource'
import TopHeader from './../../components/TopHeader.vue'
import Banner from './../../components/Banner.vue'
import Promotion from './../../components/Promotion.vue'
import Floor1 from './../../components/Floor_type_1.vue'
import Cart from './../../components/Cart.vue'

/* eslint-disable */
Vue.use(VueResource)

new Vue({
  el: '#app',
  components: {
    TopHeader,
    Banner,
    Promotion,
    Floor1,
    Cart
  },
  http: {
    url: '/stores/show/1bedb9a8-b868-11e5-aefc-acbc3297b89f',
    method: 'GET'
  },
  ready: function() {
    this.$http.get()
        .then(function(response) {
          this.$set('storeData',response.data)
        })
  }
})
