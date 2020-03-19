// import request from '../../utils/request'
var common = require('../../utils/request.js')

/**
 * 04.获取鸟类的目集合
 */
export function getBirdOrder(data) {
  return common.request({
    url: '/api/BirdOrder',
    method: 'get',
    params: data
  })
}

/**
 * 07.根据鸟类的目查询鸟的科和种
 */
export function getBirdByOrder(data) {
  return common.request({
    url: '/api/BirdByOrder',
    method: 'get',
    params: data
  })
}

