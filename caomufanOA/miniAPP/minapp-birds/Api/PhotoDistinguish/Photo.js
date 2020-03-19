// import request from '../../utils/request.js'
var common = require('../../utils/request.js')

/**
 *09.上传照片进行鸟类图像识别
 */
export function imgReco({ filePath, data }) {
  return common.uploadFile({
    url: '/api/imgReco',
    filePath: filePath,
    params: data
  })
}