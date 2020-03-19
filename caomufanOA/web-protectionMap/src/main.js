import Vue from 'vue'
import App from './App'
import './assets/iconFont/iconfont.css'
// 调用淘宝的界面兼容
import './assets/js/flexible'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
