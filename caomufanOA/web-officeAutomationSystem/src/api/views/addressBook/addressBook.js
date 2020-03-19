import request from '@/utils/request'

// 新增用户----详细信息
export function addUserAddDetail(data) {
  return request({
    url: '/api/User/AddDetail',
    method: 'post',
    data
  })
}
// 更新部门----详细信息
export function addUserUpdateDetail(data) {
  return request({
    url: '/api/User/UpdateDetail',
    method: 'put',
    params:data
  })
}
// 删除部门用户
export function delDepartmentDeleteUser(data) {
  return request({
    url: '/api/department/DeleteUser',
    method: 'DELETE',
    params:data
  })
}

// 添加部门
export function addDepartment(data) {
  return request({
    url: '/api/department',
    method: 'post',
    data
  })
}

// 删除部门
export function delDepartment(data) {
  return request({
    url: '/api/department',
    method: 'DELETE',
    params:data
  })
}

// 更新部门名称
export function putDepartment(data) {
  return request({
    url: '/api/department',
    method: 'put',
    params:data
  })
}

// 获取全部人员（选择框选择人员（包括部门列表））
export function getUser(data) {
  return request({
    url: '/api/user',
    method: 'get',
    params: data
  })
}

// 获取全全部人员详情数据
export function getUserAllUserDetail(data) {
  return request({
    url: '/api/user/AllUserDetail',
    method: 'get',
    params: data
  })
}


// 根据Code拿OpenID
export function grtOpenId(data) {
  return request({
    url: '/api/user',
    method: 'post',
    data
  })
}
