var windowAlias = window
var encodeWrapper = windowAlias.encodeURIComponent
var decodeWrapper = windowAlias.decodeURIComponent

/*
 * UTF-8 encoding
 */
function utf8_encode (argString) {
  return unescape(encodeWrapper(argString))
}

function safeDecodeWrapper (url) {
  try {
    return decodeWrapper(url)
  } catch (e) {
    return unescape(url)
  }
}

function isDefined (property) {
  var propertyType = typeof property

  return propertyType !== 'undefined'
}

function isFunction (property) {
  return typeof property === 'function'
}

function isObject (property) {
  return typeof property === 'object'
}

var isArray = ('isArray' in Array) ? Array.isArray : function (value) {
  return toString.call(value) === '[object Array]'
}

function isString (property) {
  return typeof property === 'string' || property instanceof String
}

function isEmpty (value, allowEmptyString) {
  return (value === null) || (value === undefined) || (!allowEmptyString ? value === '' : false) || (isArray(value) && value.length === 0)
}

function isObjectEmpty (property) {
  if (!property) {
    return true
  }

  var i
  var isEmpty = true
  for (i in property) {
    if (Object.prototype.hasOwnProperty.call(property, i)) {
      isEmpty = false
    }
  }

  return isEmpty
}

function apply (object, config) {
  if (object && config && typeof config === 'object') {
    var i

    for (i in config) {
      object[i] = config[i]
    }

    //  var enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable',
    //    'toLocaleString', 'toString', 'constructor'];
    //  if (enumerables) {
    //  for (j = enumerables.length; j--;) {
    //    k = enumerables[j];
    //    if (config.hasOwnProperty(k)) {
    //      object[k] = config[k];
    //    }
    //  }
    //  }
  }

  return object
}

function clone(item) {
  var type,
    i,
    j,
    k,
    cloneObj,
    key;
  var enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable'];

  if (item === null || item === undefined) {
    return item;
  }

  // DOM nodes
  // recursively
  if (item.nodeType && item.cloneNode) {
    return item.cloneNode(true);
  }

  type = toString.call(item);

  // Date
  if (type === '[object Date]') {
    return new Date(item.getTime());
  }


  // Array
  if (type === '[object Array]') {
    i = item.length;

    cloneObj = [];

    while (i--) {
      cloneObj[i] = clone(item[i]);
    }
  }
  // Object
  else if (type === '[object Object]' && item.constructor === Object) {
    cloneObj = {};

    for (key in item) {
      cloneObj[key] = clone(item[key]);
    }

    //if (enumerables) {
    //  for (j = enumerables.length; j--;) {
    //    k = enumerables[j];
    //    if (item.hasOwnProperty(k)) {
    //      cloneObj[k] = item[k];
    //    }
    //  }
    //}
  }

  return cloneObj || item;
}

/*
 * Set cookie value
 */
function setCookie (cookieName, value, msToExpire, path, domain, secure) {
  var expiryDate

  if (msToExpire) {
    expiryDate = new Date()
    expiryDate.setTime(expiryDate.getTime() + msToExpire)
  }

  document.cookie = cookieName + '=' + encodeWrapper(value) +
    (msToExpire ? ';expires=' + expiryDate.toGMTString() : '') +
    ';path=' + (path || '/') +
    (domain ? ';domain=' + domain : '') +
    (secure ? ';secure' : '')
}

/*
 * Get cookie value
 */
function getCookie (cookieName) {
  //  if (configCookiesDisabled) {
  //    return 0;
  //  }

  var cookiePattern = new RegExp('(^|;)[ ]*' + cookieName + '=([^;]*)')
  var cookieMatch = cookiePattern.exec(document.cookie)

  return cookieMatch ? decodeWrapper(cookieMatch[2]) : null
}

function getHostName (url) {
  // scheme : // [username [: password] @] hostame [: port] [/ [path] [? query] [# fragment]]
  var e = new RegExp('^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)')
  var matches = e.exec(url)

  return matches ? matches[1] : url
}

module.exports = {
  utf8_encode: utf8_encode,
  safeDecodeWrapper: safeDecodeWrapper,
  isDefined: isDefined,
  isFunction: isFunction,
  isObject: isObject,
  isArray: isArray,
  isString: isString,
  isEmpty: isEmpty,
  isObjectEmpty: isObjectEmpty,
  apply: apply,
  clone: clone,
  setCookie: setCookie,
  getCookie: getCookie,
  getHostName: getHostName
}
