import request from '@/utils/request'


// 新增用途清单
export function addPurpose(data) {
  return request({
    url: '/api/purpose',
    method: 'post',
    data
  })
}

// 获取用途清单
export function getPurpose(data) {
  return request({
    url: '/api/purpose',
    method: 'get',
    params: data
  })
}

// 删除用途清单
export function delPurpose(data) {
  return request({
    url: '/api/purpose',
    method: 'DELETE',
    params:data
  })
}
