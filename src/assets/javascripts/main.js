import Vue from 'vue'
// import url from 'url'
import envConfig from './config.js'
import VueResource from 'vue-resource'
import TopHeader from './../../components/TopHeader.vue'
import Banner from './../../components/Banner.vue'
import Promotion from './../../components/Promotion.vue'
import Floor1 from './../../components/Floor_type_1.vue'
import Cart from './../../components/Cart.vue'

/* eslint-disable */
Vue.use(VueResource)

let proxy_url = envConfig.test.serverAddress

let uuid = url.uuid

let request_url =  proxy_url + uuid
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
    url: request_url,
    method: 'GET'
  },
  ready: function() {
    this.$http.get({id: '1bedb9a8-b868-11e5-aefc-acbc3297b89f'})
        .then(function(response) {
          this.$set('storeData', response.data)
        }, function(response){
          this.$set('storeData', '系统异常')
        }
        )
  }
})
