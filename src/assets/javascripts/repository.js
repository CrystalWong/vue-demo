let tool = require('./util/tool');
let cookieExprireTime = 365* 24 * 60 * 60;
let cookiePrefix = 'onepiece.';

let Repository = Stapes.subclass({
  constructor : function() {
  },

  setCookie: function() {

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
    tool.setCookie(cookiePrefix + 'temp_user_id', encodeURIComponent(value), cookieExprireTime, '/', tool.getHostName(window.location.href));
  }
});

module.exports = new Repository();
