import request from '@/utils/request'


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


//作废申请（只有状态为审核中的申请可进行撤回操作）
export function undoInvalid(data) {
  return request({
    url: '/api/undo/invalid',
    method: 'post',
    data
  })
}
