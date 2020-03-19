import request from '@/utils/request'


// 添加差旅费报销申请
export function addBusinessTrip(data) {
  return request({
    url: '/api/BusinessTrip',
    method: 'post',
    data
  })
}


//获取差旅费报销申请详情
export function getBusinessTripDetail(data) {
  return request({
    url: '/api/businessTrip/detail',
    method: 'get',
    params:data
  })
}


//获取差旅费报销申请列表
export function getBusinessTrip(data) {
  return request({
    url: '/api/BusinessTrip',
    method: 'get',
    params:data
  })
}
