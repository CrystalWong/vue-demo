let tool = require('./tool');
let cookieExprireTime = 365* 24 * 60 * 60;
let cookiePrefix = 'onepiece.';

let Repository = Stapes.subclass({
  constructor : function() {
  },

  setCookie: function(key, value, expireTime, path, domain) {
    var et = (expireTime == null) ? cookieExprireTime : expireTime;
    tool.setCookie(key, encodeURIComponent(value), et, path || '/', domain || '.dmall.com');
  },

  getUserTempId:function(){
    "use strict";
    var str = tool.getCookie('globalTempUserId') || tool.getCookie(cookiePrefix + 'temp_user_id');
    return(str.length > 0 ? decodeURIComponent(str): null);
  },

  setUserTempId:function(value){
    "use strict";
    if(!value) {
      return;
    }
    this.setCookie(cookiePrefix + 'temp_user_id', value);
  }
});

module.exports = new Repository();
