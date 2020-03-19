import request from '@/utils/request'

// 获取左侧用户意向项目列表
export function getUserProject(data) {
    return request({
      url: '/api/intentionproject/List',
      method: 'get',
      data
    })
  }