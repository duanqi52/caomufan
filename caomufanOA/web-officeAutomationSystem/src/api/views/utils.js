import request from '@/utils/request'

// 上传文件
export function updataFile(data) {
  return request({
    url: '/api/file',
    method: 'post',
    data
  })
}

// 获取登录用户的信息
export function getUserDetail(data) {
  return request({
    url: '/api/User/Detail',
    method: 'get',
    params: data
  })
}
