// import request from '../../utils/request.js'
var common = require('../../utils/request.js')



// /**
//  *08.上传录音进行鸟类声音识别
//  */
// export function audioReco(data) {
//   return common.request({
//     url: '/api/audioReco',
//     method: 'post',
//     params: data
//   })
// }


/**
 * 14.上传文件
 */
export function audioReco({ filePath, data }) {
  return common.uploadFile({
    url: '/api/audioReco',
    filePath: filePath,
    params: data
  })
}
