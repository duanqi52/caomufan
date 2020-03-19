import request from '@/utils/request'

// 新增角色信息
export function addRoleUser(data) {
  return request({
    url: '/api/Role/User',
    method: 'post',
    data
  })
}

// 获取角色人员
export function getRoleUser(data) {
  return request({
    url: '/api/Role/User',
    method: 'get',
    params: data
  })
}



// 获取角色人员
export function deleteRoleUser(data) {
  return request({
    url: '/api/Role/User',
    method: 'DELETE',
    params: data
  })
}
