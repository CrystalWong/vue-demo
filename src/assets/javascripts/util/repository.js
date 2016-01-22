let tool = require('./tool')
let cookieExprireTime = 365 * 24 * 60 * 60
let CONSTANT = require('./constant.js')
let Stapes = require('stapes')

let Repository = Stapes.subclass({
  constructor: function () {
  },

  setCookie: function (key, value, expireTime, path, domain) {
    var et = (expireTime == null) ? cookieExprireTime : expireTime
    tool.setCookie(key, encodeURIComponent(value), et, path || '/', domain || CONSTANT.COOKIEDOMAIN)
  },

  getUserTempId: function () {
    var str = tool.getCookie('globalTempUserId') || tool.getCookie(CONSTANT.USERTEMPID)
    return ((str && str.length) > 0 ? decodeURIComponent(str) : null)
  },

  setUserTempId: function (value) {
    if (!value) {
      return
    }
    this.setCookie(CONSTANT.USERTEMPID, value)
  }
})

module.exports = new Repository()
