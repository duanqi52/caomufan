import request from '@/utils/request'


// 新增采购申请
export function addPurchase(data) {
  return request({
    url: '/api/purchase',
    method: 'post',
    data
  })
}


//获取支付申请列表
export function getPurchase(data) {
  console.log(data)
  return request({
    url: '/api/Purchase',
    method: 'get',
    params:data
  })
}


//获取支付采购申请详情
export function getPurchaseDetail(data) {
  return request({
    url: '/api/Purchase/detail',
    method: 'get',
    params:data
  })
}
