import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: ()=>import('@/views/index/index')
    },
    // 首页
    {
      path: '/index',
      name: 'index',
      component: ()=>import('@/views/index/index')
    },
    // 首页
    {
      path: '/resetGo',
      name: 'resetGo',
      component: ()=>import('@/views/resetGo/resetGo')
    },

  ]
})
