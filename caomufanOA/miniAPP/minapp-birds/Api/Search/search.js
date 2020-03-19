// import request from '../../utils/request.js'
var common = require('../../utils/request.js')


/**
 * 02.获取热门搜索记录
 */
export function getHotWords(data) {
  return common.request({
    url: '/api/HotWords',
    method: 'get',
    params: data
  })
} 


/**
 * 03.获取生僻字接口
 */
export function getRareWords(data) {
  return common.request({
    url: '/api/RareWords',
    method: 'get',
    params: data
  })
} 