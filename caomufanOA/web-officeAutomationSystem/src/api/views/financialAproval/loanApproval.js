import request from '@/utils/request'


//新增借款申请
export function addBorrow(data) {
  return request({
    url: '/api/Borrow',
    method: 'post',
    data
  })
}


//获取借款申请详情
export function getBorrowDetail(data) {
  return request({
    url: '/api/borrow/detail',
    method: 'get',
    params:data
  })
}

//借款申请选择框
export function getBorrowAll(data) {
  return request({
    url: '/api/borrow/all',
    method: 'get',
    params:data
  })
}


//获取借款申请列表
export function getBorrow(data) {
  return request({
    url: '/api/borrow',
    method: 'get',
    params:data
  })
}
