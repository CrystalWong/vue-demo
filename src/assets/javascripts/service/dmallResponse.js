'use strict'

let Response = function (response) {
  if (200 === response.status && '0000' === response.data.code) {
    return response.data.data
  } else {
    throw new Error(response.data.result)
  }
}

module.exports = Response
