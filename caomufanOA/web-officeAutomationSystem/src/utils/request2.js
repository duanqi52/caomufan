import axios from 'axios'
import router from '@/router'
import {Message,Loading} from 'element-ui';


// requestUrl一般请求路径  requestUrl1 为com的请求路径
const requestUrl1 = 'https://com.caomufan.net'
// const requestUrl = 'https://123'
const requestUrl = 'https://home.caomufan.net'
// const requestUrl = 'http://172.19.1.50:9001'


function getToken() {
  let tokenGet = '';
  tokenGet = window.localStorage.getItem('token');
  if(tokenGet==''||tokenGet==undefined||tokenGet==null)
  {
    // Message.error('即将跳转到登录页面');

  }
  return tokenGet
}

const app_session ='53a2b4a9dfed4f2aa5e352948b711890'
const app_version = '1.0.0'
var loading
// 创建axios实例
const service = axios.create({
  baseURL: requestUrl, // api的base_url
  timeout: 100000, // 请求超时时间
  // withCredentials: true, // 允许携带cookie
  headers:{
    // 'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
    'Content-Type':'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin':'*',
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'x-eco-client-version':app_version,
    'x-eco-client-appsession':app_session
  },

})

// request拦截器--------请求之前的处理
// response.setHeader("Access-Control-Allow-Methods", "*");

// request拦截器--------请求之前的处理
service.interceptors.request.use(config => {


    //在请求发送之前做一些事
    // // 请求头带上token
    config.headers['x-eco-session'] = getToken();
    loading= Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    return config;


}, error => {
  // Do something with request error
  // console.log('请求错误')
  Promise.reject(error)
})



// respone拦截器-------请求完成数据处理
service.interceptors.response.use(
  response => {
    response.headers['Access-Control-Allow-Methods'] = '*';
    //关闭加载层
    loading.close();
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response;
    // console.log(res)
    if (res.status !== 200) {
      console.log(res.statusText)
      if (res.status === 401) {

      }
      return Promise.reject("系统错误");
    } else {
      // messageCode为3时即为未登录
      if(res.data.messageCode==3)
      {
        // router.push(
        //   {
        //     path:'/login'
        //   }
        // )
        // return Promise.reject("你未登录");
      }else{
        // return response.data
      }

      return response.data
    }
  },
  error => {
    // console.log(error)
    if(error.message === 'notLogin')
    {
      console.log('未登录')
    }
    else if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
      Message.error('请求超时！');
    }
    return Promise.reject(error)
  }
)


export default service
