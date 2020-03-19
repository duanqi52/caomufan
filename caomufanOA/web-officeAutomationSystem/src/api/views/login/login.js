import request from '@/utils/request'

/**
 * 登录
 * @param username
 * @param password
 * @param captcha
 */
// 微信登录
export function wxlogin(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

// 微信登录   暂时放弃
export function wxlogin2(data) {
  return request({
    url: 'https://com.caomufan.net/api/wxsnslogin',
    method: 'post',
    data
  })
}


// 退出登录
export function getlogout(query) {
  return request({
    url: 'https://com.caomufan.net/api/logout',
    method: 'get',
    params:query
  })
}


export function getInfo() {
  return request({
    url: '/sys/sysmenu/nav',
    method: 'get'
  })
}
