import axios from 'axios'
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// requestUrl一般请求路径  requestUrl1 为com的请求路径
const requestUrl1 = 'https://com.caomufan.net'
const requestUrl = 'https://gis.caomufan.net'
// const requestUrl = 'http://172.19.1.174:9001'


const app_session ='62ef38035b904fc18b17f436d0b2d15d'
const app_version = '1.0.0'
var token =window.localStorage.getItem('token')



// 创建axios实例
const service = axios.create({
  baseURL: requestUrl, // api的base_url
  timeout: 100000, // 请求超时时间
  // withCredentials: true, // 允许携带cookie
  headers:{
    // 'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
    'Content-Type':'application/json;charset=UTF-8',
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'x-eco-client-version':app_version,
    'x-eco-client-appsession':app_session
  },

})
var loading

// request拦截器--------请求之前的处理
service.interceptors.request.use(config => {
  //在请求发送之前做一些事
  // // 请求头带上token
  config.headers['x-eco-session'] = token;
  // loading= Loading.service({
  //   lock: true,
  //   text: 'Loading',
  //   spinner: 'el-icon-loading',
  //   background: 'rgba(0, 0, 0, 0)'
  // });

  return config;
}, error => {
  // Do something with request error
  console.log('请求错误')
  Promise.reject(error)
})



// respone拦截器-------请求完成数据处理
service.interceptors.response.use(
  response => {
    //关闭加载层
    // loading.close();
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response;


    if (res.status !== 200) {

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.status === 401) {

      }
      return Promise.reject("系统错误");
    } else {


      return response.data
    }
  },
  error => {

    return Promise.reject(error)
  }
)


export default service
