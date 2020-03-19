import request from '@/utils/request'

/**
 * 登录
 * @param username
 * @param password
 * @param captcha
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/sys/sysmenu/nav',
    method: 'get'
  })
}
