import request from '@/api/request'

// 动物
let url1='https://animal.caomufan.net'
// 植物
let url2='https://plant.caomufan.net'
// 单位
let url3='https://client.caomufan.net'
// 地理空间信息：
let url4='https://gis.caomufan.net'


// 获取纲列表
export function getAnimalClass(query) {
  request.defaults.baseURL=url1
  return request({
    url: '/api/AnimalClass',
    method: 'get',
    params:query
  })
}

// 根据纲获取目列表
export function getAnimalOrder(query) {
  request.defaults.baseURL=url1
  return request({
    url: '/api/AnimalOrder',
    method: 'get',
    params:query
  })
}

// 根据目名称获取动物信息  根据目获取科与动物详情的列表
export function getAnimalByOrder(query) {
  request.defaults.baseURL=url1
  return request({
    url: '/api/animalByOrder',
    method: 'get',
    params:query
  })
}

// 获取动物详情
export function getAnimalDetail(query) {
  request.defaults.baseURL=url1
  return request({
    url: '/api/animalDetail',
    method: 'get',
    params:query
  })
}

// 获取科下所有动物 根据科获取种列表
export function getAnimalByFamily(query) {
  request.defaults.baseURL=url1
  return request({
    url: '/api/animalByFamily',
    method: 'get',
    params:query
  })
}


