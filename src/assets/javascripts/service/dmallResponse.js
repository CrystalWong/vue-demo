'use strict'

let Response = function (response) {
  if (response.status === 200 && response.data.code === '0000') {
    return response.data.data
  } else {
    throw new Error(response.data.result)
  }
}

module.exports = Response
