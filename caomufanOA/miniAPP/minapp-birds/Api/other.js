// import request from '../../utils/request.js'
var common = require('../utils/request.js')


/**
 * 12.登陆接口
 */
export function wxlogin(data) {
  return common.request2({
    url: '/api/wxLogin',
    method: 'post',
    params: data
  })
} 

/**
 * 13.上传用户信息
 */
export function uploadUserInfo(data) {
  return common.request2({
    url: '/api/wxUser',
    method: 'put',
    params: data
  })
} 

/**
 * 14.上传文件   com接口专用
 */
export function alioss({filePath, data}) {
  return common.uploadFile2({
    url: '/api/alioss',
    filePath: filePath,
    params: data
  })
}