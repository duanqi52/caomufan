// import request from '../../utils/request'
var common = require('../../utils/request.js')


/**
 *08.上传录音进行鸟类声音识别
 */
export function audioReco(data) {
  return common.request({
    url: '/api/audioReco',
    method: 'post',
    params: data
  })
}


/**
 * 10.获取鸟类声音识别分享数据
 */
export function getAudioShare(data) {
  return common.request({
    url: '/api/AudioShare',
    method: 'get',
    params: data
  })
} 