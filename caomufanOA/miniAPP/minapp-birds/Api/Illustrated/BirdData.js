// import request from '../../utils/request'
var common = require('../../utils/request.js')


/**
 * 05.获取鸟类详情数据
 */
export function getBirdsDetail(data) {
  return common.request({
    url: '/api/BirdDetail',
    method: 'get',
    params: data
  })
} 