import request from '@/api/request'

// 动物
let url1='https://animal.caomufan.net'

// 动物搜索
export function postAnimalsearch(data) {
  request.defaults.baseURL=url1
  return request({
    url: '/api/animalsearch',
    method: 'post',
    data
  })
}
