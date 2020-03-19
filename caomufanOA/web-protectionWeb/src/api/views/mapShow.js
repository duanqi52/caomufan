import request from '@/api/request'
/**
 * 列表
 */
export function list(query) {
  return request({
    url: '/GuideWechat/attraction/list',
    method: 'get',
    params:query
  })
}


export function getHotWords(data) {
  return request({
    url: '/api/HotWords',
    method: 'get',
    params: data
  })
}
