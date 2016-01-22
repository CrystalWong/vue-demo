import Vue from 'vue'
// import url from 'url'
import redirectServer from './config/config.js'
import VueResource from 'vue-resource'
// import TopHeader from './../../components/TopHeader.vue'
import Banner from './../../components/Banner.vue'
import Promotion from './../../components/Promotion.vue'
import Floor1 from './../../components/Floor_type_1.vue'
import Cart from './../../components/Cart.vue'
import Loading from './../../components/Loading.vue'

/* eslint-disable */
Vue.use(VueResource)

let proxy_url = redirectServer.storesApi
// console.log("proxy_url: " + proxy_url)
let uuid = url.uuid

let request_url =  proxy_url + uuid
new Vue({
  el: '#app',
  components: {
    // TopHeader,
    Banner,
    Promotion,
    Floor1,
    Cart,
    Loading
  },
  http: {
    url: request_url,
    method: 'GET'
  },
  ready: function() {
    this.$http.get()
        .then(function(response) {
          this.$set('storeData', response.data)
        }, function(response){
          this.$set('storeData', '系统异常')
        })
  }
})
