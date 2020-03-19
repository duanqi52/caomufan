import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/theme/elementUiTheme/index.css';
import ElementUI from 'element-ui';
import Print from 'vue-print-nb';

import './assets/fontStyle/projectIcon/iconfont.css';
import './assets/fontStyle/projectIcon/iconfont.js'
Vue.use(Print);  //注册打印的插件

Vue.use(ElementUI); //注册elementUi

Vue.config.productionTip = false

// 引入mintUi
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

// 路由设置title
router.beforeEach((to,from,next)=>{
  if(to.meta.title)
  {
    document.title=to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
