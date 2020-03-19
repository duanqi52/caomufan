import request from '@/api/request'

// 植物
let url2='https://plant.caomufan.net'

// 植物搜索
export function postPlantSearch(data) {
  request.defaults.baseURL=url2
  return request({
    url: '/api/PlantSearch',
    method: 'post',
    data
  })
}
