var Stapes = require('stapes')
var tool = require('../util/tool.js')

var Dmall = Stapes.subclass({
  constructor: function (obj) {
    var header = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'apiVersion': '1.6.1',
      'platform': 'webApp'
    }
    this.vueresource = require('vue')
    this.vueresource.use(require('vue-resource'))
    tool.apply(this.vueresource.http.headers.common, header)
  },
  get: function (url) {
    return this.vueresource.http.get(url)
  },
  post: function (url) {
    return this.vueresource.http.post(url)
  },
  jsonp: function (url) {
    return this.vueresource.http.jsonp(url)
  },
  getHeader: function () {
    return this.vueresource.http.headers.common
  }
})
module.exports = Dmall
