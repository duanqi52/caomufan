// import request from '../../utils/request.js'
var common = require('../../utils/request.js')


/**
 * 01.鸟类搜索
 */
export function search(data) {
  return common.request({
    url: '/api/search',
    method: 'get',
    params: data
  })
} 