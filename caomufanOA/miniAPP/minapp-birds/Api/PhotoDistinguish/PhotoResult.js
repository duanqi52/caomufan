// import request from '../../utils/request.js'
var common = require('../../utils/request.js')


/**
 *09.上传照片进行鸟类图像识别
 */
export function imgReco(data) {
  return common.request({
    url: '/api/imgReco',
    method: 'post',
    params: data
  })
}

/**
 * 11.获取鸟类图片识别分享数据
 */
export function getImgShare(data) {
  return common.request({
    url: '/api/ImgShare',
    method: 'get',
    params: data
  })
} 