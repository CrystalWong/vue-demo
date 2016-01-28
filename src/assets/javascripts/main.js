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
// import repository from './util/repository.js'
import CONSTANT from './util/constant.js'
// import tool from './util/tool.js'



/* eslint-disable */
Vue.use(VueResource)

let proxy_url = redirectServer.storesApi
// console.log("proxy_url: " + proxy_url)
let uuid = url.uuid

let request_url =  proxy_url + uuid
let appVm = new Vue({
  el: '#app',
  components: {
    // TopHeader,
    Banner,
    Promotion,
    Floor1,
    Cart,
    Loading
  },

  data: {
      storeData:{},
      overflowVisible: true,
      overflowHiden: false
  },
  http: {
    url: request_url,
    method: 'GET'
  },
  ready: function() {
    this.$http.get()
      .then(function(response) {
        localStorage.setItem(CONSTANT.VENDORID, response.data.vendor_id)
        localStorage.setItem(CONSTANT.STOREID, response.data.d_store_id)
        localStorage.setItem(CONSTANT.LNG, response.data.lng)
        localStorage.setItem(CONSTANT.LAT, response.data.lat)
        localStorage.setItem(CONSTANT.AREADID, response.data.zipcode)
        localStorage.setItem(CONSTANT.COMMUNITYNAME, response.data.address)
        this.$set('storeData', response.data)
      }, function(response){
        this.$set('storeData', '系统异常')
      })
  },
  events: {
    hideOverflow: function () {
      this.$set('overflowVisible', false)
      this.$set('overflowHiden', true)

    },
    showOverflow: function() {
      this.$set('overflowVisible', true)
      this.$set('overflowHiden', false)

    }
  }

})

