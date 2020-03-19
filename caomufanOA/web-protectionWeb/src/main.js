import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/iconFont/iconfont.css'
// 调用淘宝的界面兼容
import './assets/js/flexible'

// 加载element框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
