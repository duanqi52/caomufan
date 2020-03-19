import request from '@/utils/request'

// 获取获取我的流程
export function getMyProcess(data) {
  return request({
    url: '/api/myProcess',
    method: 'get',
    params: data
  })
}

// 更新抄送为已读
export function updataMyprocessStatus(data) {
  return request({
    url: '/api/myprocess/updateStatus',
    method: 'put',
    params: data
  })
}


// 审批
export function updataApprove(data) {
  return request({
    url: '/api/approve',
    method: 'post',
    data
  })
}

// 获取获取我的流程
export function getMyProcessRemindCount(data) {
  return request({
    url: '/api/myProcess/RemindCount',
    method: 'get',
    params: data
  })
}
