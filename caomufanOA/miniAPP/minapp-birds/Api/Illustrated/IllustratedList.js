// import request from '../../utils/request'
var common = require('../../utils/request.js')


/**
 * 06.根据鸟类的科查询鸟类的数据
 */
export function getBirdByFamily(data) {
  return common.request({
    url: '/api/BirdByFamily',
    method: 'get',
    params: data
  })
} 