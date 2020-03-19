import request from '@/api/request'
// import service from "../request";


// 动物
let url1='https://animal.caomufan.net'
// 植物
let url2='https://plant.caomufan.net'
// 单位
let url3='https://client.caomufan.net'
// 地理空间信息：
let url4='https://gis.caomufan.net'


/**
 * 获取单位列表  即获取地区列表
 * 即获取选中地区存在哪些功能选项
 */
export function getgps(query) {
  request.defaults.baseURL='https://restapi.amap.com'
  return request({
    url: '/v3/assistant/coordinate/convert',
    method: 'get',
    params:query
  })
}

/**
 * 获取单位列表  即获取地区列表
 * 即获取选中地区存在哪些功能选项
 */
export function getunit(query) {
  request.defaults.baseURL=url3
  return request({
    url: '/api/unit',
    method: 'get',
    params:query
  })
}

/**
 * 获取数据库存在的单位数据（用于判断单位的多个功能按钮显示与否）
 * 即获取选中地区存在哪些功能选项
 */

export function getUnitfunction(query) {
  request.defaults.baseURL=url3
  return request({
    url: '/api/unitfunction',
    method: 'get',
    params:query
  })
}

/**
 * 获取面空间数据
 * 面数据类型(Function：功能区；Class：小班；Boundary：边界）
 */
export function getPolygon(query) {
  request.defaults.baseURL=url4
  return request({
    url: '/api/polygon',
    method: 'get',
    params:query
  })
}

/**
 * 获取点空间数据
 * 数据类型(Point:样点；SamplePlot：样地；InfCamera：红外相机；UnitCenter：保护区中心点)
 */
export function getPoint(query) {
  request.defaults.baseURL=url4
  return request({
    url: '/api/point',
    method: 'get',
    params:query
  })
}

/**
 * 获取线空间数据
 * 空间线类型（SampleLine：样线）
 */
export function getLine(query) {
  request.defaults.baseURL=url4
  return request({
    url: '/api/Line',
    method: 'get',
    params:query
  })
}



/**
 * 空间分析获取视窗内保护区的位置点
 * 获取的数据是一个点
 *
 */
export function postUnitPointByAnaly(data) {
  request.defaults.baseURL=url4
    return request({
        url: '/api/unitPointByAnaly',
        method: 'post',
        data
    })
}

/**
 * 空间分析获取视窗内保护区的边界
 * 就是获取当前区域有多少个保护地的面
 * 获取的数据是一个面
 *
 */
export function postUnitBorderByAnaly(data) {
  request.defaults.baseURL=url4
    return request({
        url: '/api/unitBorderByAnaly',
        method: 'post',
        data
    })
}
