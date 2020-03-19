import request from '@/utils/request'

// 获取审批流程控制觉的金额
export function getProcess(data) {
  return request({
    url: '/api/process',
    method: 'get',
    params: data
  })
}

// 更新流程控制金额
export function updataProcess(data) {
  return request({
    url: '/api/process',
    method: 'put',
    params:data
  })
}
