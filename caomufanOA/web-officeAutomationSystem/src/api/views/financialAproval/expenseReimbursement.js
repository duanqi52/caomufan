import request from '@/utils/request'


// 添加费用报销申请
export function addReimbursement(data) {
  return request({
    url: '/api/reimbursement',
    method: 'post',
    data
  })
}

// 获取费用报销申请详情
export function getReimbursementDetail(data) {
  return request({
    url: '/api/reimbursement/detail',
    method: 'get',
    params: data
  })
}


// 获取费用申请列表
export function getReimbursement(data) {
  return request({
    url: '/api/reimbursement',
    method: 'get',
    params: data
  })
}
