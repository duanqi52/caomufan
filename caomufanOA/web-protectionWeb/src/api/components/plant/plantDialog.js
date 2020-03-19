import request from '@/api/request'

// 动物
let url1='https://animal.caomufan.net'
// 植物
let url2='https://plant.caomufan.net'
// 单位
let url3='https://client.caomufan.net'
// 地理空间信息：
let url4='https://gis.caomufan.net'


// 获取植物所有科
export function getPlantFamily(query) {
  request.defaults.baseURL=url2
  return request({
    url: '/api/plantFamily',
    method: 'get',
    params:query
  })
}

// 根据科获取植物  根据科获取属与植物详情的列表
export function getPlantByFamily(query) {
  request.defaults.baseURL=url2
  return request({
    url: '/api/PlantByFamily',
    method: 'get',
    params:query
  })
}

// 获取植物详情
export function getPlantDetail(query) {
  request.defaults.baseURL=url2
  return request({
    url: '/api/plantDetail',
    method: 'get',
    params:query
  })
}

// 获取属下所有植物 根据属获取种列表
export function getPlantByGenus(query) {
  request.defaults.baseURL=url2
  return request({
    url: '/api/plantByGenus',
    method: 'get',
    params:query
  })
}
