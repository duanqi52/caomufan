import request from '@/utils/request'


//新增借款申请
export function postBorrow(data) {
  return request({
    url: '/api/Borrow',
    method: 'post',
    data
  })
}

// 添加差旅费报销申请
export function postBusinessTrip(data) {
  return request({
    url: '/api/BusinessTrip',
    method: 'post',
    data
  })
}

// 添加费用报销申请
export function postReimbursement(data) {
  return request({
    url: '/api/reimbursement',
    method: 'post',
    data
  })
}

// 新增采购申请
export function postPurchase(data) {
  return request({
    url: '/api/purchase',
    method: 'post',
    data
  })
}


// 审批是否通过
export function postApprove(data) {
  return request({
    url: '/api/approve',
    method: 'post',
    data
  })
}

//撤回申请（只有状态为审核中的申请可进行撤回操作）
export function postUndo(data) {
  return request({
    url: '/api/undo',
    method: 'post',
    data
  })
}
