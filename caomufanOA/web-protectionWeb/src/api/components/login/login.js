import request from '@/api/request'

// 微信登录
export function postwxsnslogin(data) {
  request.defaults.baseURL='https://com.caomufan.net'
  return request({
    url: '/api/wxsnslogin',
    method: 'post',
    data
  })
}

// 退出登录
export function getlogout(query) {
  request.defaults.baseURL='https://com.caomufan.net'
  return request({
    url: '/api/logout',
    method: 'get',
    params:query
  })
}
